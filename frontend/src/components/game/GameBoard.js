import { getBoardRows, getStageForTile, SNAKES, LADDERS } from '../../lib/gameData';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const boardRows = getBoardRows();

export default function GameBoard({ currentTile }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="game-board" data-testid="game-board">
        {boardRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`board-row ${row.isReversed ? 'reversed' : ''}`}
          >
            {row.tiles.map((tileNum) => {
              const stage = getStageForTile(tileNum);
              const isSnakeHead = SNAKES[tileNum];
              const isLadderBottom = LADDERS[tileNum];
              const isPlayer = currentTile === tileNum;
              const isIPO = tileNum >= 48;

              return (
                <Tooltip key={tileNum}>
                  <TooltipTrigger asChild>
                    <div
                      data-testid={`tile-${tileNum}`}
                      className={`board-tile ${isPlayer ? 'tile-active' : ''} ${isSnakeHead ? 'tile-snake' : ''} ${isLadderBottom ? 'tile-ladder' : ''} ${isIPO ? 'tile-ipo' : ''}`}
                      style={{
                        backgroundColor: stage.color,
                        borderColor: isSnakeHead ? '#C0392B' : isLadderBottom ? '#27AE60' : stage.borderColor,
                      }}
                    >
                      <span className="tile-number">{tileNum}</span>
                      <span className="tile-stage" style={{ color: stage.borderColor }}>
                        {stage.name === 'IPO / Exit' ? 'IPO' : stage.name}
                      </span>

                      {isSnakeHead && (
                        <span className="tile-indicator snake-indicator">
                          <ArrowDown size={10} />
                          {SNAKES[tileNum].tail}
                        </span>
                      )}

                      {isLadderBottom && (
                        <span className="tile-indicator ladder-indicator">
                          <ArrowUp size={10} />
                          {LADDERS[tileNum].top}
                        </span>
                      )}

                      {isPlayer && (
                        <div className="player-token" data-testid="player-token">
                          <div className="token-inner" />
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="tile-tooltip">
                    <p className="font-semibold">Tile {tileNum} - {stage.name}</p>
                    {isSnakeHead && (
                      <p className="text-red-600 text-xs">
                        Saanp! {SNAKES[tileNum].name} (Go to {SNAKES[tileNum].tail})
                      </p>
                    )}
                    {isLadderBottom && (
                      <p className="text-green-600 text-xs">
                        Seedhi! {LADDERS[tileNum].name} (Climb to {LADDERS[tileNum].top})
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="board-legend">
          <span className="legend-item">
            <span className="legend-dot snake-dot" /> Saanp (Snake)
          </span>
          <span className="legend-item">
            <span className="legend-dot ladder-dot" /> Seedhi (Ladder)
          </span>
          <span className="legend-item">
            <span className="legend-dot player-dot" /> You
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
