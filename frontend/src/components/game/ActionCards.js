import {
  Megaphone, Package, Users, Wrench, IndianRupee, Pause
} from 'lucide-react';

const CATEGORY_CONFIG = {
  marketing: { icon: Megaphone, color: '#D35400', label: 'Marketing' },
  product: { icon: Package, color: '#8E44AD', label: 'Product' },
  team: { icon: Users, color: '#2E86C1', label: 'Team' },
  bugfix: { icon: Wrench, color: '#27AE60', label: 'Bug Fix' },
  fundraise: { icon: IndianRupee, color: '#F39C12', label: 'Fundraise' },
  save: { icon: Pause, color: '#7F8C8D', label: 'Save' },
};

export default function ActionCards({ cards, funds, onSelect }) {
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
                {config.label}
              </span>
              {card.cost > 0 && (
                <span className={`card-cost ${!canAfford ? 'text-red-500' : ''}`}>
                  -Rs.{card.cost.toLocaleString('en-IN')}
                </span>
              )}
              {card.cost === 0 && card.effects.funds > 0 && (
                <span className="card-cost text-green-600">
                  +Rs.{card.effects.funds.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="card-body">
              <p className="card-name">{card.name}</p>
              <p className="card-hindi">{card.nameHindi}</p>
            </div>

            <div className="card-effects">
              {card.effects.customers > 0 && (
                <span className="effect-badge effect-positive">+{card.effects.customers} customers</span>
              )}
              {card.effects.customers < 0 && (
                <span className="effect-badge effect-negative">{card.effects.customers} customers</span>
              )}
              {card.effects.reputation > 0 && (
                <span className="effect-badge effect-positive">Rep +</span>
              )}
              {card.effects.reputation < 0 && (
                <span className="effect-badge effect-negative">Rep -</span>
              )}
              {card.effects.bugMeter < 0 && (
                <span className="effect-badge effect-positive">Bug {card.effects.bugMeter}</span>
              )}
              {card.effects.bugMeter > 0 && (
                <span className="effect-badge effect-negative">Bug +{card.effects.bugMeter}</span>
              )}
              {card.effects.burn < 0 && (
                <span className="effect-badge effect-positive">Burn -</span>
              )}
              {card.effects.burn > 0 && (
                <span className="effect-badge effect-negative">Burn +</span>
              )}
              {card.effects.ownership < 0 && (
                <span className="effect-badge effect-negative">{card.effects.ownership}% equity</span>
              )}
            </div>

            <p className="card-description">{card.description}</p>
          </button>
        );
      })}
    </div>
  );
}
