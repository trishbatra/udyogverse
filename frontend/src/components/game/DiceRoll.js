import { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { Button } from '../ui/button';

const DICE_ICONS = [null, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default function DiceRoll({ onRoll }) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayFace, setDisplayFace] = useState(1);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Animate dice faces rapidly
    let count = 0;
    const interval = setInterval(() => {
      setDisplayFace(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsRolling(false);
        onRoll();
      }
    }, 80);
  };

  const DiceIcon = DICE_ICONS[displayFace] || Dice1;

  return (
    <div className="dice-roll-container" data-testid="dice-roll-container">
      <div className={`dice-visual ${isRolling ? 'dice-shaking' : ''}`}>
        <DiceIcon size={64} strokeWidth={1.5} />
      </div>
      <Button
        data-testid="roll-dice-button"
        onClick={handleRoll}
        disabled={isRolling}
        size="lg"
        className="roll-button"
      >
        {isRolling ? 'Rolling...' : 'Pasa Phenk! (Roll Dice)'}
      </Button>
    </div>
  );
}
