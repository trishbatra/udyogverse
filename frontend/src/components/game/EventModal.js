import { Button } from '../ui/button';
import {
  ArrowDown, ArrowUp, AlertTriangle, TrendingUp,
  Trophy, Frown, AlertCircle
} from 'lucide-react';

const EVENT_CONFIG = {
  snake: { icon: ArrowDown, color: '#C0392B', bg: '#FDEDEC', title: 'Saanp! (Snake)' },
  ladder: { icon: ArrowUp, color: '#27AE60', bg: '#EAFAF1', title: 'Seedhi! (Ladder)' },
  bug: { icon: AlertTriangle, color: '#E67E22', bg: '#FEF5E7', title: 'Bug Alert!' },
  stageUp: { icon: TrendingUp, color: '#2E86C1', bg: '#EBF5FB', title: 'Stage Up!' },
  win: { icon: Trophy, color: '#F39C12', bg: '#FEF9E7', title: 'Safal Udyam!' },
  hardLose: { icon: Frown, color: '#C0392B', bg: '#FDEDEC', title: 'Game Over' },
  struggle: { icon: AlertCircle, color: '#E67E22', bg: '#FEF5E7', title: 'Struggle Mode' },
};

export default function EventModal({ event, onAcknowledge }) {
  if (!event) return null;

  const config = EVENT_CONFIG[event.type] || EVENT_CONFIG.bug;
  const Icon = config.icon;

  return (
    <div className="event-overlay" data-testid="event-modal">
      <div className="event-modal" style={{ borderTopColor: config.color }}>
        <div className="event-header" style={{ backgroundColor: config.bg }}>
          <Icon size={28} style={{ color: config.color }} />
          <h3 className="event-title" style={{ color: config.color }}>
            {config.title}
          </h3>
        </div>

        <div className="event-body">
          {event.name && (
            <p className="event-name">{event.name}</p>
          )}
          {event.nameHindi && (
            <p className="event-hindi">{event.nameHindi}</p>
          )}
          {event.description && (
            <p className="event-description">{event.description}</p>
          )}

          {/* Snake specific */}
          {event.type === 'snake' && (
            <div className="event-effect snake-effect">
              <ArrowDown size={16} />
              Tile {event.fromTile} se {event.toTile} tak gire!
              <span className="text-xs block mt-1">(-5 customers, -Rs.3,000)</span>
            </div>
          )}

          {/* Ladder specific */}
          {event.type === 'ladder' && (
            <div className="event-effect ladder-effect">
              <ArrowUp size={16} />
              Tile {event.fromTile} se {event.toTile} tak chadhe!
              <span className="text-xs block mt-1">(+10 customers)</span>
            </div>
          )}

          {/* Stage Up */}
          {event.type === 'stageUp' && (
            <div className="event-effect stage-effect">
              <TrendingUp size={16} />
              {event.prevStageName} complete! Welcome to {event.stageName}!
              <span className="text-xs block mt-1">(+Rs.{event.reward?.toLocaleString('en-IN')} reward)</span>
            </div>
          )}

          {/* Win */}
          {event.type === 'win' && (
            <div className="event-effect win-effect">
              <Trophy size={16} />
              Congratulations! Aap Safal Udyami ban gaye!
              <span className="text-xs block mt-1">You built a successful business!</span>
            </div>
          )}

          {/* Struggle */}
          {event.type === 'struggle' && (
            <div className="event-effect struggle-effect">
              <AlertCircle size={16} />
              Funds khatam ho rahe hain! Sambhal ke chalo.
              <span className="text-xs block mt-1">Recovery is still possible!</span>
            </div>
          )}

          {/* Hard Lose */}
          {event.type === 'hardLose' && (
            <div className="event-effect lose-effect">
              <Frown size={16} />
              Business band karna pada. Par haar mat mano!
              <span className="text-xs block mt-1">Every failure is a lesson.</span>
            </div>
          )}
        </div>

        <div className="event-footer">
          <Button
            data-testid="event-acknowledge-button"
            onClick={onAcknowledge}
            className="event-btn"
            style={{ backgroundColor: config.color }}
          >
            {event.type === 'win' || event.type === 'hardLose' ? 'Dekho Result' : 'Aage Badho'}
          </Button>
        </div>
      </div>
    </div>
  );
}
