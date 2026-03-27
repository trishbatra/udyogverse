import { useState } from 'react';
import '@/App.css';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import { useGameEngine } from './lib/gameEngine';

function App() {
  const [gameConfig, setGameConfig] = useState(null);
  const gameEngine = useGameEngine();

  const handleStart = (config) => {
    setGameConfig(config);
    gameEngine.startGame(config);
  };

  const handleReset = () => {
    setGameConfig(null);
    gameEngine.resetGame();
  };

  if (!gameConfig || !gameEngine.isStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return <GameScreen gameEngine={gameEngine} onReset={handleReset} />;
}

export default App;
