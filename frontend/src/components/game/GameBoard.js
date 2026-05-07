import { getBoardRows, getStageForTile, getStageName, SNAKES, LADDERS } from '../../lib/gameData';
import { useLanguage } from '../../lib/LanguageContext';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const boardRows = getBoardRows();

export default function GameBoard({ currentTile }) {
  const { lang, t } = useLanguage();

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
                        {stage.name === 'IPO / Exit' ? (lang === 'en' ? 'IPO' : getStageName(stage, lang)) : getStageName(stage, lang)}
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
                    <p className="font-semibold">{t('tileWord')} {tileNum} - {stage.name}</p>
                    {isSnakeHead && (
                      <p className="text-red-600 text-xs">
                        {t('snakeTooltip')} {SNAKES[tileNum].name} ({t('goTo')} {SNAKES[tileNum].tail})
                      </p>
                    )}
                    {isLadderBottom && (
                      <p className="text-green-600 text-xs">
                        {t('ladderTooltip')} {LADDERS[tileNum].name} ({t('climbTo')} {LADDERS[tileNum].top})
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
            <span className="legend-dot snake-dot" /> {t('snakeLegend')}
          </span>
          <span className="legend-item">
            <span className="legend-dot ladder-dot" /> {t('ladderLegend')}
          </span>
          <span className="legend-item">
            <span className="legend-dot player-dot" /> {t('youLegend')}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
