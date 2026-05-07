import {
  Megaphone, Package, Users, Wrench, IndianRupee, Pause
} from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import { getCardName } from '../../lib/gameData';

const CATEGORY_CONFIG = {
  marketing: { icon: Megaphone, color: '#D35400', labelKey: 'marketing' },
  product: { icon: Package, color: '#8E44AD', labelKey: 'product' },
  team: { icon: Users, color: '#2E86C1', labelKey: 'team' },
  bugfix: { icon: Wrench, color: '#27AE60', labelKey: 'bugfix' },
  fundraise: { icon: IndianRupee, color: '#F39C12', labelKey: 'fundraise' },
  save: { icon: Pause, color: '#7F8C8D', labelKey: 'save' },
};

export default function ActionCards({ cards, funds, onSelect }) {
  const { lang, t } = useLanguage();

  return (
    <div className="action-cards" data-testid="action-cards">
      {cards.map((card, index) => {
        const config = CATEGORY_CONFIG[card.category] || CATEGORY_CONFIG.save;
        const Icon = config.icon;
        const canAfford = card.cost <= funds;

        return (
          <button
            key={card.id}
            data-testid={`action-card-${index}`}
            className={`action-card ${!canAfford ? 'card-disabled' : ''}`}
            onClick={() => canAfford && onSelect(card)}
            disabled={!canAfford}
            style={{ '--card-accent': config.color }}
          >
            <div className="card-header">
              <span className="card-category" style={{ color: config.color }}>
                <Icon size={14} className="inline mr-1" />
                {t(config.labelKey)}
              </span>
              {card.cost > 0 && (
                <span className={`card-cost ${!canAfford ? 'text-red-500' : ''}`}>
                  -{t('currencyPrefix')}{card.cost.toLocaleString('en-IN')}
                </span>
              )}
              {card.cost === 0 && card.effects.funds > 0 && (
                <span className="card-cost text-green-600">
                  +{t('currencyPrefix')}{card.effects.funds.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="card-body">
              <p className="card-name">{lang === 'en' ? card.name : getCardName(card, lang)}</p>
              <p className="card-hindi">{lang === 'en' ? card.nameHindi : card.name}</p>
            </div>

            <div className="card-effects">
              {card.effects.customers > 0 && (
                <span className="effect-badge effect-positive">+{card.effects.customers} {t('customersLabel')}</span>
              )}
              {card.effects.customers < 0 && (
                <span className="effect-badge effect-negative">{card.effects.customers} {t('customersLabel')}</span>
              )}
              {card.effects.reputation > 0 && (
                <span className="effect-badge effect-positive">{t('repPlus')}</span>
              )}
              {card.effects.reputation < 0 && (
                <span className="effect-badge effect-negative">{t('repMinus')}</span>
              )}
              {card.effects.bugMeter < 0 && (
                <span className="effect-badge effect-positive">{t('bugLabel')} {card.effects.bugMeter}</span>
              )}
              {card.effects.bugMeter > 0 && (
                <span className="effect-badge effect-negative">{t('bugLabel')} +{card.effects.bugMeter}</span>
              )}
              {card.effects.burn < 0 && (
                <span className="effect-badge effect-positive">{t('burnMinus')}</span>
              )}
              {card.effects.burn > 0 && (
                <span className="effect-badge effect-negative">{t('burnPlus')}</span>
              )}
              {card.effects.ownership < 0 && (
                <span className="effect-badge effect-negative">{card.effects.ownership}% {t('equityLabel')}</span>
              )}
            </div>

            <p className="card-description">{card.description}</p>
          </button>
        );
      })}
    </div>
  );
}
