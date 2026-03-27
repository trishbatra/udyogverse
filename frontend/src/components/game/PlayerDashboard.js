import { getStageForTile, REP_LABELS, BURN_LABELS } from '../../lib/gameData';
import BugMeter from './BugMeter';
import TurnLog from './TurnLog';
import { ScrollArea } from '../ui/scroll-area';
import {
  IndianRupee, Users, Star, Flame, PieChart, MapPin
} from 'lucide-react';

export default function PlayerDashboard({ state }) {
  const stage = getStageForTile(state.tile);

  return (
    <div className="player-dashboard" data-testid="player-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <span className="dashboard-player">{state.playerName}</span>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card" data-testid="metric-funds">
          <div className="metric-icon funds-icon">
            <IndianRupee size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Funds</span>
            <span className={`metric-value ${state.funds <= 5000 ? 'text-red-600' : ''}`}>
              Rs.{state.funds.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="metric-card" data-testid="metric-customers">
          <div className="metric-icon customers-icon">
            <Users size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Customers</span>
            <span className="metric-value">{state.customers}</span>
          </div>
        </div>

        <div className="metric-card" data-testid="metric-reputation">
          <div className="metric-icon rep-icon">
            <Star size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Reputation</span>
            <span className={`metric-value ${state.reputation === 1 ? 'text-red-600' : state.reputation === 3 ? 'text-green-600' : ''}`}>
              {REP_LABELS[state.reputation]}
            </span>
          </div>
        </div>

        <div className="metric-card" data-testid="metric-burn">
          <div className="metric-icon burn-icon">
            <Flame size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Burn Rate</span>
            <span className={`metric-value ${state.burn === 3 ? 'text-red-600' : ''}`}>
              {BURN_LABELS[state.burn]}
            </span>
          </div>
        </div>

        <div className="metric-card" data-testid="metric-ownership">
          <div className="metric-icon ownership-icon">
            <PieChart size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Ownership</span>
            <span className="metric-value">{state.ownership}%</span>
          </div>
        </div>

        <div className="metric-card" data-testid="metric-stage">
          <div className="metric-icon stage-icon" style={{ background: stage.borderColor }}>
            <MapPin size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Stage</span>
            <span className="metric-value text-sm">{stage.name}</span>
          </div>
        </div>
      </div>

      {/* Bug Meter */}
      <BugMeter value={state.bugMeter} />

      {/* Stage Progress */}
      <div className="stage-progress" data-testid="stage-progress">
        <span className="metric-label">Customer Target</span>
        <div className="stage-progress-bar">
          <div
            className="stage-progress-fill"
            style={{
              width: `${Math.min(100, (state.customers / stage.customerTarget) * 100)}%`,
            }}
          />
        </div>
        <span className="stage-progress-text">
          {state.customers} / {stage.customerTarget}
        </span>
      </div>

      {/* Turn Log */}
      <div className="turn-log-section">
        <span className="metric-label">Turn Log</span>
        <ScrollArea className="h-[160px]">
          <TurnLog history={state.turnHistory} />
        </ScrollArea>
      </div>
    </div>
  );
}
