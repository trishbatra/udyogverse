import { Button } from '../ui/button';
import { useLanguage } from '../../lib/LanguageContext';
import {
  ArrowDown, ArrowUp, AlertTriangle, TrendingUp,
  Trophy, Frown, AlertCircle
} from 'lucide-react';

const EVENT_CONFIG = {
  snake:    { icon: ArrowDown,    color: '#C0392B', bg: '#FDEDEC', titleKey: 'eventSnakeTitle' },
  ladder:   { icon: ArrowUp,      color: '#27AE60', bg: '#EAFAF1', titleKey: 'eventLadderTitle' },
  bug:      { icon: AlertTriangle,color: '#E67E22', bg: '#FEF5E7', titleKey: 'eventBugTitle' },
  stageUp:  { icon: TrendingUp,   color: '#2E86C1', bg: '#EBF5FB', titleKey: 'eventStageUpTitle' },
  win:      { icon: Trophy,       color: '#F39C12', bg: '#FEF9E7', titleKey: 'eventWinTitle' },
  hardLose: { icon: Frown,        color: '#C0392B', bg: '#FDEDEC', titleKey: 'eventGameOverTitle' },
  struggle: { icon: AlertCircle,  color: '#E67E22', bg: '#FEF5E7', titleKey: 'eventStruggleTitle' },
};

export default function EventModal({ event, onAcknowledge }) {
  const { t } = useLanguage();
  if (!event) return null;

  const config = EVENT_CONFIG[event.type] || EVENT_CONFIG.bug;
  const Icon = config.icon;

  return (
    <div className="event-overlay" data-testid="event-modal">
      <div className="event-modal" style={{ borderTopColor: config.color }}>
        <div className="event-header" style={{ backgroundColor: config.bg }}>
          <Icon size={28} style={{ color: config.color }} />
          <h3 className="event-title" style={{ color: config.color }}>
            {t(config.titleKey)}
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
              {t('snakeFell', event.fromTile, event.toTile)}
              <span className="text-xs block mt-1">{t('snakeEffectText')}</span>
            </div>
          )}

          {/* Ladder specific */}
          {event.type === 'ladder' && (
            <div className="event-effect ladder-effect">
              <ArrowUp size={16} />
              {t('ladderClimbed', event.fromTile, event.toTile)}
              <span className="text-xs block mt-1">{t('ladderEffectText')}</span>
            </div>
          )}

          {/* Stage Up */}
          {event.type === 'stageUp' && (
            <div className="event-effect stage-effect">
              <TrendingUp size={16} />
              {event.prevStageName} {t('stageComplete')} {event.stageName}!
              <span className="text-xs block mt-1">(+{t('currencyPrefix')}{event.reward?.toLocaleString('en-IN')} {t('rewardWord')})</span>
            </div>
          )}

          {/* Win */}
          {event.type === 'win' && (
            <div className="event-effect win-effect">
              <Trophy size={16} />
              {t('winText')}
              <span className="text-xs block mt-1">{t('winSubText')}</span>
            </div>
          )}

          {/* Struggle */}
          {event.type === 'struggle' && (
            <div className="event-effect struggle-effect">
              <AlertCircle size={16} />
              {t('struggleText')}
              <span className="text-xs block mt-1">{t('struggleSubText')}</span>
            </div>
          )}

          {/* Hard Lose */}
          {event.type === 'hardLose' && (
            <div className="event-effect lose-effect">
              <Frown size={16} />
              {t('loseText')}
              <span className="text-xs block mt-1">{t('loseSubText')}</span>
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
            {event.type === 'win' || event.type === 'hardLose' ? t('acknowledgeWin') : t('acknowledgeNext')}
          </Button>
        </div>
      </div>
    </div>
  );
}
