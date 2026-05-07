// Udyogverse - Game Engine Hook
import { useState, useCallback } from 'react';
import {
  SNAKES, LADDERS, BUG_CARDS, BURN_COST,
  getStageForTile, getEligibleCards
} from './gameData';

function clamp(min, val, max) {
  return Math.max(min, Math.min(max, val));
}

function applyEffects(state, effects) {
  const next = { ...state };
  if (effects.customers) next.customers = Math.max(0, next.customers + effects.customers);
  if (effects.funds) next.funds = next.funds + effects.funds;
  if (effects.reputation) next.reputation = clamp(1, next.reputation + effects.reputation, 3);
  if (effects.burn) next.burn = clamp(1, next.burn + effects.burn, 3);
  if (effects.bugMeter) next.bugMeter = clamp(0, next.bugMeter + effects.bugMeter, 5);
  if (effects.ownership) next.ownership = clamp(0, next.ownership + effects.ownership, 100);
  return next;
}

function createInitialState(config) {
  return {
    playerName: config.playerName,
    startupIdea: config.startupIdea,
    startupType: config.startupType,
    tile: 1,
    funds: 50000,
    customers: 0,
    reputation: 2,
    burn: 1,
    bugMeter: 0,
    ownership: 100,
    turn: 1,
    phase: 'selectAction',
    gameStatus: 'playing',
    currentCards: [],
    selectedCard: null,
    lastDiceRoll: null,
    eventQueue: [],
    currentEvent: null,
    turnHistory: [],
    lastActions: [],
    struggleTurns: 0,
    stageRewards: [],
  };
}

export function useGameEngine() {
  const [state, setState] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const startGame = useCallback((config) => {
    const initial = createInitialState(config);
    initial.currentCards = getEligibleCards(initial);
    setState(initial);
    setIsStarted(true);
  }, []);

  const selectAction = useCallback((card) => {
    setState(prev => {
      if (!prev || prev.phase !== 'selectAction') return prev;

      let next = { ...prev };
      // Deduct cost
      next.funds -= card.cost;
      // Apply card effects
      next = applyEffects(next, card.effects);
      next.selectedCard = card;
      next.phase = 'rollDice';

      // Track last actions for marketing-without-ops mechanic
      const newLastActions = [...prev.lastActions, card.category].slice(-3);
      next.lastActions = newLastActions;

      // Marketing without ops increases bug meter
      const recentMarketing = newLastActions.filter(a => a === 'marketing').length;
      if (recentMarketing >= 2) {
        next.bugMeter = clamp(0, next.bugMeter + 1, 5);
      }

      return next;
    });
  }, []);

  const rollDice = useCallback(() => {
    const dice = Math.floor(Math.random() * 6) + 1;

    setState(prev => {
      if (!prev || prev.phase !== 'rollDice') return prev;

      let next = { ...prev };
      next.lastDiceRoll = dice;

      // Calculate new tile
      let newTile = Math.min(prev.tile + dice, 50);
      const events = [];

      // Check snake
      if (SNAKES[newTile]) {
        const snake = SNAKES[newTile];
        events.push({
          type: 'snake',
          name: snake.name,
          nameHindi: snake.nameHindi,
          description: snake.description,
          fromTile: newTile,
          toTile: snake.tail,
        });
        // Snake penalties
        next.customers = Math.max(0, next.customers - 5);
        next.funds = Math.max(0, next.funds - 3000);
        newTile = snake.tail;
      }
      // Check ladder
      else if (LADDERS[newTile]) {
        const ladder = LADDERS[newTile];
        events.push({
          type: 'ladder',
          name: ladder.name,
          nameHindi: ladder.nameHindi,
          description: ladder.description,
          fromTile: newTile,
          toTile: ladder.top,
        });
        // Ladder bonuses
        next.customers += 10;
        newTile = ladder.top;
      }

      next.tile = newTile;

      // Bug check
      if (prev.bugMeter > 0) {
        const bugChance = 0.1 + prev.bugMeter * 0.1;
        if (Math.random() < bugChance) {
          const bugCard = BUG_CARDS[Math.floor(Math.random() * BUG_CARDS.length)];
          events.push({
            type: 'bug',
            name: bugCard.name,
            nameHindi: bugCard.nameHindi,
            description: bugCard.description,
            effects: bugCard.effects,
          });
          next = applyEffects(next, bugCard.effects);
        }
      }

      // Stage check
      const prevStage = getStageForTile(prev.tile);
      const newStage = getStageForTile(newTile);
      if (prevStage.id !== newStage.id && !prev.stageRewards.includes(prevStage.id) && prevStage.reward > 0) {
        const goalsMet = prev.customers >= prevStage.customerTarget;
        if (goalsMet) {
          events.push({
            type: 'stageUp',
            stageName: newStage.name,
            stageHindi: newStage.nameHindi,
            reward: prevStage.reward,
            prevStageName: prevStage.name,
          });
          next.funds += prevStage.reward;
          next.stageRewards = [...prev.stageRewards, prevStage.id];
        }
      }

      // Apply burn cost
      const burnCost = BURN_COST[next.burn] || 1000;
      next.funds -= burnCost;

      // Turn history
      const stage = getStageForTile(newTile);
      next.turnHistory = [
        {
          turn: prev.turn,
          action: prev.selectedCard?.name || 'None',
          dice,
          tile: newTile,
          stage: stage.name,
          events: events.map(e => e.type),
        },
        ...prev.turnHistory,
      ].slice(0, 20);

      // Check win condition
      if (newTile >= 48 && next.customers >= 500 && next.funds > 0) {
        next.gameStatus = 'won';
        events.push({ type: 'win' });
      }
      // Check lose conditions
      else if (next.funds <= 0) {
        if (next.reputation <= 1 && next.bugMeter >= 5) {
          next.struggleTurns += 1;
          if (next.struggleTurns >= 3) {
            next.gameStatus = 'lost';
            events.push({ type: 'hardLose' });
          } else {
            next.gameStatus = 'struggle';
            events.push({ type: 'struggle', turnsLeft: 3 - next.struggleTurns });
          }
        } else {
          next.gameStatus = 'struggle';
          next.funds = 0;
          events.push({ type: 'struggle' });
        }
      } else {
        next.struggleTurns = 0;
      }

      // Set events
      if (events.length > 0) {
        next.currentEvent = events[0];
        next.eventQueue = events.slice(1);
        next.phase = 'event';
      } else {
        next.phase = 'turnEnd';
      }

      return next;
    });
  }, []);

  const acknowledgeEvent = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      const next = { ...prev };

      if (prev.eventQueue.length > 0) {
        next.currentEvent = prev.eventQueue[0];
        next.eventQueue = prev.eventQueue.slice(1);
      } else {
        next.currentEvent = null;
        if (prev.gameStatus === 'won' || prev.gameStatus === 'lost') {
          next.phase = 'gameOver';
        } else {
          next.phase = 'turnEnd';
        }
      }
      return next;
    });
  }, []);

  const nextTurn = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      const next = { ...prev };
      next.turn += 1;
      next.phase = 'selectAction';
      next.selectedCard = null;
      next.lastDiceRoll = null;
      next.currentEvent = null;
      next.eventQueue = [];
      next.currentCards = getEligibleCards(next);
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(null);
    setIsStarted(false);
  }, []);

  const restoreGame = useCallback((savedState) => {
    setState(savedState);
    setIsStarted(true);
  }, []);

  return {
    state,
    isStarted,
    startGame,
    selectAction,
    rollDice,
    acknowledgeEvent,
    nextTurn,
    resetGame,
    restoreGame,
  };
}
