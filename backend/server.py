from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import certifi
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tlsCAFile=certifi.where())
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Models
class LeaderboardEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_name: str
    startup_idea: str
    stage_reached: str
    turns_taken: int
    ownership_retained: int
    customers: int
    funds: int
    won: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeaderboardCreate(BaseModel):
    player_name: str
    startup_idea: str
    stage_reached: str
    turns_taken: int
    ownership_retained: int
    customers: int
    funds: int
    won: bool


# ---- Auth Models ----

class UserCreate(BaseModel):
    email: str
    password: str
    player_name: str
    startup_idea: str
    startup_type: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    player_name: str
    startup_idea: str
    startup_type: str
    created_at: datetime


class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    hashed_password: str
    player_name: str
    startup_idea: str
    startup_type: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Auth Endpoints ----

@api_router.post("/auth/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email.strip().lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered. Please log in.")

    hashed = bcrypt.hashpw(user_data.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user = User(
        email=user_data.email.strip().lower(),
        hashed_password=hashed,
        player_name=user_data.player_name,
        startup_idea=user_data.startup_idea,
        startup_type=user_data.startup_type,
    )
    doc = user.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.users.insert_one(doc)

    return UserResponse(
        id=user.id,
        email=user.email,
        player_name=user.player_name,
        startup_idea=user.startup_idea,
        startup_type=user.startup_type,
        created_at=user.created_at,
    )


@api_router.post("/auth/login", response_model=UserResponse)
async def login(credentials: UserLogin):
    doc = await db.users.find_one({"email": credentials.email.strip().lower()}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not bcrypt.checkpw(credentials.password.encode("utf-8"), doc["hashed_password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if isinstance(doc.get("created_at"), str):
        doc["created_at"] = datetime.fromisoformat(doc["created_at"])

    return UserResponse(
        id=doc["id"],
        email=doc["email"],
        player_name=doc["player_name"],
        startup_idea=doc["startup_idea"],
        startup_type=doc["startup_type"],
        created_at=doc["created_at"],
    )


@api_router.get("/")
async def root():
    return {"message": "Udyogverse API"}


# ---- Game State Endpoints ----

class GameSave(BaseModel):
    user_id: str
    state: dict


@api_router.post("/game/save")
async def save_game(data: GameSave):
    doc = {
        "user_id": data.user_id,
        "state": data.state,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    result = await db.game_states.replace_one({"user_id": data.user_id}, doc, upsert=True)
    turn = data.state.get("turn", "?")
    action = "inserted" if result.upserted_id else "updated"
    logger.info(f"Game state {action} for user {data.user_id[:8]}… turn={turn}")
    return {"ok": True}


@api_router.get("/game/state/{user_id}")
async def get_game_state(user_id: str):
    doc = await db.game_states.find_one({"user_id": user_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="No saved game")
    return doc["state"]


@api_router.delete("/game/state/{user_id}")
async def delete_game_state(user_id: str):
    await db.game_states.delete_one({"user_id": user_id})
    return {"ok": True}


@api_router.post("/leaderboard", response_model=LeaderboardEntry)
async def create_leaderboard_entry(input_data: LeaderboardCreate):
    entry = LeaderboardEntry(**input_data.model_dump())
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leaderboard.insert_one(doc)
    return entry


@api_router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard():
    entries = await db.leaderboard.find(
        {}, {"_id": 0}
    ).sort("customers", -1).limit(10).to_list(10)

    for entry in entries:
        if isinstance(entry.get('created_at'), str):
            entry['created_at'] = datetime.fromisoformat(entry['created_at'])

    return entries


# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
