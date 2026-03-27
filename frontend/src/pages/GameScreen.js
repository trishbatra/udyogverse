import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import GameBoard from '../components/game/GameBoard';
import PlayerDashboard from '../components/game/PlayerDashboard';
import ActionCards from '../components/game/ActionCards';
import DiceRoll from '../components/game/DiceRoll';
import EventModal from '../components/game/EventModal';
import GameOverScreen from '../components/game/GameOverScreen';
import { getStageForTile } from '../lib/gameData';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function GameScreen({ gameEngine, onReset }) {
  const { state, selectAction, rollDice, acknowledgeEvent, nextTurn } = gameEngine;

  useEffect(() => {
    if (!state) return;
    // Auto-scroll to action area when phase changes
    const el = document.getElementById('action-area');
    if (el && (state.phase === 'selectAction' || state.phase === 'rollDice')) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [state?.phase]);

  if (!state) return null;

  if (state.phase === 'gameOver') {
    return <GameOverScreen state={state} onReset={onReset} />;
  }

  const currentStage = getStageForTile(state.tile);

  return (
    <div className="game-screen" data-testid="game-screen">
      {/* Top Bar */}
      <div className="game-topbar" data-testid="game-topbar">
        <div className="topbar-left">
          <span className="topbar-title">Udyogverse</span>
          <span className="topbar-stage" style={{ color: currentStage.borderColor }}>
            {currentStage.name} ({currentStage.nameHindi})
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-turn" data-testid="turn-counter">Turn {state.turn}</span>
          <span className="topbar-idea">{state.startupIdea}</span>
          <button onClick={onReset} className="topbar-reset" data-testid="reset-game-button">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="game-layout">
        {/* Board Area */}
        <div className="game-board-area">
          <GameBoard
            currentTile={state.tile}
            previousTile={state.turnHistory[0]?.tile}
          />

          {/* Action Area */}
          <div id="action-area" className="action-area" data-testid="action-area">
            {state.phase === 'selectAction' && (
              <>
                <h3 className="action-title" data-testid="action-phase-title">
                  Action chuno (Choose your action)
                </h3>
                <ActionCards
                  cards={state.currentCards}
                  funds={state.funds}
                  onSelect={selectAction}
                />
              </>
            )}

            {state.phase === 'rollDice' && (
              <div className="dice-area" data-testid="dice-phase">
                <p className="dice-action-text">
                  <strong>{state.selectedCard?.name}</strong> executed!
                  {state.selectedCard?.cost > 0 && ` (-Rs.${state.selectedCard.cost.toLocaleString('en-IN')})`}
                </p>
                <DiceRoll onRoll={rollDice} />
              </div>
            )}

            {state.phase === 'turnEnd' && (
              <div className="turn-end-area" data-testid="turn-end-phase">
                <p className="turn-summary">
                  Turn {state.turn} complete! Tile {state.tile} | {currentStage.name} stage
                </p>
                <Button
                  data-testid="next-turn-button"
                  onClick={nextTurn}
                  className="next-turn-btn"
                  size="lg"
                >
                  Agla Turn <ArrowRight size={18} className="ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard */}
        <PlayerDashboard state={state} />
      </div>

      {/* Event Modal */}
      {state.phase === 'event' && state.currentEvent && (
        <EventModal
          event={state.currentEvent}
          onAcknowledge={acknowledgeEvent}
        />
      )}
    </div>
  );
}
