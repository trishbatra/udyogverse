import { Dice3, ArrowDown, ArrowUp, AlertTriangle, TrendingUp } from 'lucide-react';

const EVENT_ICONS = {
  snake: <ArrowDown size={10} className="text-red-500" />,
  ladder: <ArrowUp size={10} className="text-green-500" />,
  bug: <AlertTriangle size={10} className="text-orange-500" />,
  stageUp: <TrendingUp size={10} className="text-blue-500" />,
};

export default function TurnLog({ history }) {
  if (history.length === 0) {
    return (
      <p className="text-xs text-[#7F8C8D] p-2" data-testid="empty-turn-log">
        Abhi koi turn nahi hua... Shuruaat karo!
      </p>
    );
  }

  return (
    <div className="turn-log" data-testid="turn-log">
      {history.map((entry, i) => (
        <div key={i} className="log-entry" data-testid={`log-entry-${entry.turn}`}>
          <span className="log-turn">T{entry.turn}</span>
          <span className="log-action">{entry.action}</span>
          <span className="log-dice">
            <Dice3 size={10} /> {entry.dice}
          </span>
          <span className="log-tile">Tile {entry.tile}</span>
          <span className="log-events">
            {entry.events.map((e, j) => (
              <span key={j}>{EVENT_ICONS[e]}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
