from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
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


@api_router.get("/")
async def root():
    return {"message": "Udyogverse API"}


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
