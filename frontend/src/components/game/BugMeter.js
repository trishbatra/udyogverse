import { AlertTriangle } from 'lucide-react';

export default function BugMeter({ value }) {
  const segments = [0, 1, 2, 3, 4];
  const label = value <= 1 ? 'Stable' : value <= 3 ? 'Risky' : 'Fragile';
  const labelColor = value <= 1 ? '#27AE60' : value <= 3 ? '#E67E22' : '#C0392B';

  return (
    <div className="bug-meter" data-testid="bug-meter">
      <div className="bug-meter-header">
        <span className="metric-label">
          <AlertTriangle size={12} className="inline mr-1" />
          Bug Meter
        </span>
        <span className="bug-label" style={{ color: labelColor }}>{label}</span>
      </div>
      <div className="bug-segments">
        {segments.map((seg) => (
          <div
            key={seg}
            className={`bug-segment ${seg < value ? 'bug-active' : ''}`}
            style={{
              backgroundColor: seg < value
                ? seg < 2 ? '#F39C12' : seg < 4 ? '#E67E22' : '#C0392B'
                : '#E5E7EB',
            }}
          />
        ))}
      </div>
      <div className="bug-meter-footer">
        <span className="text-xs text-[#7F8C8D]">{value}/5</span>
        <span className="text-xs text-[#7F8C8D]">
          Snake chance: {Math.round((0.1 + value * 0.1) * 100)}%
        </span>
      </div>
    </div>
  );
}
