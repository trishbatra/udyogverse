import { useState, useEffect } from 'react';
import axios from 'axios';
import '@/App.css';
import AuthScreen from './pages/AuthScreen';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import { useGameEngine } from './lib/gameEngine';
import { LanguageProvider } from './lib/LanguageContext';

const STORAGE_KEY = 'udyogverse_user';
const API = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001'}/api`;

function App() {
  const [user, setUser] = useState(null);
  const [gameConfig, setGameConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const gameEngine = useGameEngine();

  // Save to backend at the start of each new turn and on game over
  useEffect(() => {
    const s = gameEngine.state;
    if (!user || !s) return;
    if (s.phase !== 'selectAction' && s.phase !== 'gameOver') return;
    axios.post(`${API}/game/save`, { user_id: user.id, state: s }).catch((err) => {
      console.error('[Udyogverse] game save failed:', err?.response?.status, err?.message);
    });
  }, [gameEngine.state, user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const init = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const userData = JSON.parse(saved);
          const config = {
            playerName: userData.player_name,
            startupIdea: userData.startup_idea,
            startupType: userData.startup_type,
          };
          setUser(userData);
          setGameConfig(config);

          try {
            const { data } = await axios.get(`${API}/game/state/${userData.id}`);
            gameEngine.restoreGame(data);
          } catch {
            gameEngine.startGame(config);
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAuth = async (userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    const config = {
      playerName: userData.player_name,
      startupIdea: userData.startup_idea,
      startupType: userData.startup_type,
    };
    setGameConfig(config);

    try {
      const { data } = await axios.get(`${API}/game/state/${userData.id}`);
      gameEngine.restoreGame(data);
    } catch {
      gameEngine.startGame(config);
    }
  };

  const handleStart = (config) => {
    setGameConfig(config);
    gameEngine.startGame(config);
  };

  const handleReset = () => {
    // Delete saved game — user explicitly wants a fresh start
    if (user) axios.delete(`${API}/game/state/${user.id}`).catch(() => {});
    setGameConfig(null);
    gameEngine.resetGame();
  };

  const handleLogout = () => {
    // Do NOT delete game state — user should resume where they left off on next login
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setGameConfig(null);
    gameEngine.resetGame();
  };

  if (loading) return null;

  if (!user) return <AuthScreen onAuth={handleAuth} />;

  if (!gameConfig || !gameEngine.isStarted) {
    return <StartScreen onStart={handleStart} prefillData={user} />;
  }

  return <GameScreen gameEngine={gameEngine} onReset={handleReset} onLogout={handleLogout} />;
}

export default function AppWithProvider() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
