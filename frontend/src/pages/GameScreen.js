import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import GameBoard from '../components/game/GameBoard';
import PlayerDashboard from '../components/game/PlayerDashboard';
import ActionCards from '../components/game/ActionCards';
import DiceRoll from '../components/game/DiceRoll';
import EventModal from '../components/game/EventModal';
import GameOverScreen from '../components/game/GameOverScreen';
import { getStageForTile, getStageName } from '../lib/gameData';
import { useLanguage } from '../lib/LanguageContext';
import { RotateCcw, ArrowRight, LogOut } from 'lucide-react';
import LanguagePicker from '../components/LanguagePicker';

export default function GameScreen({ gameEngine, onReset, onLogout }) {
  const { state, selectAction, rollDice, acknowledgeEvent, nextTurn } = gameEngine;
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!state) return;
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
  const stageSubtitle = lang === 'en' ? currentStage.nameHindi : getStageName(currentStage, lang);

  return (
    <div className="game-screen" data-testid="game-screen">
      {/* Top Bar */}
      <div className="game-topbar" data-testid="game-topbar">
        <div className="topbar-left">
          <span className="topbar-title">{t('appTitle')}</span>
          <span className="topbar-stage" style={{ color: currentStage.borderColor }}>
            {currentStage.name} ({stageSubtitle})
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-turn" data-testid="turn-counter">{t('turn')} {state.turn}</span>
          <span className="topbar-idea">{state.startupIdea}</span>
          <LanguagePicker className="topbar-lang-picker" />
          <button onClick={onReset} className="topbar-reset" data-testid="reset-game-button">
            <RotateCcw size={16} />
          </button>
          {onLogout && (
            <button onClick={onLogout} className="topbar-reset" title="Logout">
              <LogOut size={16} />
            </button>
          )}
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
                  {t('chooseAction')}
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
                  <strong>{state.selectedCard?.name}</strong> {t('executed')}
                  {state.selectedCard?.cost > 0 && ` (-${t('currencyPrefix')}${state.selectedCard.cost.toLocaleString('en-IN')})`}
                </p>
                <DiceRoll onRoll={rollDice} />
              </div>
            )}

            {state.phase === 'turnEnd' && (
              <div className="turn-end-area" data-testid="turn-end-phase">
                <p className="turn-summary">
                  {t('turnComplete', state.turn, state.tile, currentStage.name)}
                </p>
                <Button
                  data-testid="next-turn-button"
                  onClick={nextTurn}
                  className="next-turn-btn"
                  size="lg"
                >
                  {t('nextTurn')} <ArrowRight size={18} className="ml-1" />
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
