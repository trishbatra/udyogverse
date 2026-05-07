import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { getStageForTile, REP_LABELS } from '../../lib/gameData';
import { useLanguage } from '../../lib/LanguageContext';
import { Trophy, Frown, RotateCcw, Star, Users, IndianRupee, PieChart, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LEVEL_KEY = { 'Low': 'low', 'Medium': 'medium', 'High': 'high' };

export default function GameOverScreen({ state, onReset }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const won = state.gameStatus === 'won';
  const stage = getStageForTile(state.tile);

  useEffect(() => {
    if (!submitted) {
      const entry = {
        player_name: state.playerName,
        startup_idea: state.startupIdea,
        stage_reached: stage.name,
        turns_taken: state.turn,
        ownership_retained: state.ownership,
        customers: state.customers,
        funds: Math.max(0, state.funds),
        won,
      };
      axios.post(`${API}/leaderboard`, entry)
        .then(() => setSubmitted(true))
        .catch(() => {});
    }
    axios.get(`${API}/leaderboard`)
      .then(res => setLeaderboard(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="gameover-screen" data-testid="game-over-screen">
      <div className="gameover-card">
        {/* Header */}
        <div className={`gameover-header ${won ? 'gameover-win' : 'gameover-lose'}`}>
          {won ? <Trophy size={48} /> : <Frown size={48} />}
          <h1 className="gameover-title">
            {won ? t('gameWonTitle') : t('gameLostTitle')}
          </h1>
          <p className="gameover-subtitle">
            {won ? t('gameWonSubtitle') : t('gameLostSubtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="gameover-stats">
          <div className="gameover-stat" data-testid="gameover-stage">
            <MapPin size={18} />
            <span>{t('stageReachedLabel')}: <strong>{stage.name}</strong></span>
          </div>
          <div className="gameover-stat" data-testid="gameover-turns">
            <Clock size={18} />
            <span>{t('turnsLabel')}: <strong>{state.turn}</strong></span>
          </div>
          <div className="gameover-stat" data-testid="gameover-customers">
            <Users size={18} />
            <span>{t('customers')}: <strong>{state.customers}</strong></span>
          </div>
          <div className="gameover-stat" data-testid="gameover-funds">
            <IndianRupee size={18} />
            <span>{t('funds')}: <strong>{t('currencyPrefix')}{Math.max(0, state.funds).toLocaleString('en-IN')}</strong></span>
          </div>
          <div className="gameover-stat" data-testid="gameover-ownership">
            <PieChart size={18} />
            <span>{t('ownership')}: <strong>{state.ownership}%</strong></span>
          </div>
          <div className="gameover-stat" data-testid="gameover-reputation">
            <Star size={18} />
            <span>{t('reputation')}: <strong>{t(LEVEL_KEY[REP_LABELS[state.reputation]])}</strong></span>
          </div>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="leaderboard" data-testid="leaderboard">
            <h3 className="leaderboard-title">{t('leaderboard')}</h3>
            <div className="leaderboard-list">
              {leaderboard.map((entry, i) => (
                <div key={entry.id || i} className="leaderboard-entry" data-testid={`leaderboard-entry-${i}`}>
                  <span className="lb-rank">#{i + 1}</span>
                  <span className="lb-name">{entry.player_name}</span>
                  <span className="lb-stage">{entry.stage_reached}</span>
                  <span className="lb-turns">T{entry.turns_taken}</span>
                  <span className="lb-customers">{entry.customers}c</span>
                  {entry.won && <Trophy size={12} className="text-yellow-500" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restart */}
        <Button
          data-testid="play-again-button"
          onClick={onReset}
          size="lg"
          className="play-again-btn"
        >
          <RotateCcw size={18} className="mr-2" />
          {t('playAgain')}
        </Button>
      </div>
    </div>
  );
}
