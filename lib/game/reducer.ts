import {
  GAME_SCHEMA_VERSION,
  type GameAction,
  type GameState,
  type Player,
  SEAT_COLORS,
} from "./types";

const now = () => new Date().toISOString();

export function createGame(playerNames: string[], targetScore: number): GameState {
  const players: Player[] = playerNames.map((rawName, index) => ({
    seat: index + 1,
    name: rawName.trim() || `Jugador ${index + 1}`,
    color: SEAT_COLORS[index],
    totalScore: 0,
    roundScore: 0,
    status: "active",
    hasAnsweredThisRound: false,
    lastAction: null,
  }));

  const timestamp = now();
  return {
    schemaVersion: GAME_SCHEMA_VERSION,
    gameId: crypto.randomUUID(),
    status: "in_progress",
    phase: "selecting_starter",
    createdAt: timestamp,
    updatedAt: timestamp,
    targetScore: Math.max(1, Math.min(999, Math.round(targetScore))),
    roundNumber: 1,
    players,
    startingPlayerIndex: null,
    currentPlayerIndex: 0,
    selectedCategory: null,
    categoryRerollUsed: false,
    currentQuestion: null,
    revealedPositions: [],
    pendingRevealPosition: null,
    usedQuestionIds: [],
    winners: [],
  };
}

function touch(state: GameState): GameState {
  return { ...state, updatedAt: now() };
}

function activeIndexes(players: Player[]): number[] {
  return players.flatMap((player, index) => (player.status === "active" ? [index] : []));
}

function nextActiveIndex(players: Player[], current: number): number | null {
  for (let distance = 1; distance <= players.length; distance += 1) {
    const candidate = (current + distance) % players.length;
    if (players[candidate]?.status === "active") return candidate;
  }
  return null;
}

function finishRound(state: GameState, bankActivePlayers: boolean): GameState {
  const players = state.players.map((player) => {
    if (bankActivePlayers && player.status === "active") {
      return {
        ...player,
        totalScore: player.totalScore + player.roundScore,
        roundScore: 0,
        status: "banked" as const,
        lastAction: "bank" as const,
      };
    }
    return player;
  });
  const bestScore = Math.max(...players.map((player) => player.totalScore));
  const hasWinner = bestScore >= state.targetScore;
  const winners = hasWinner
    ? players.flatMap((player, index) => (player.totalScore === bestScore ? [index] : []))
    : [];

  return touch({
    ...state,
    players,
    status: hasWinner ? "finished" : "in_progress",
    phase: hasWinner ? "game_over" : "round_summary",
    pendingRevealPosition: null,
    winners,
  });
}

function advanceOrFinish(state: GameState, players: Player[]): GameState {
  if (activeIndexes(players).length === 0) return finishRound({ ...state, players }, false);
  const next = nextActiveIndex(players, state.currentPlayerIndex);
  if (next === null) return finishRound({ ...state, players }, false);
  return touch({ ...state, players, currentPlayerIndex: next });
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_STARTER": {
      if (state.phase !== "selecting_starter") return state;
      const playerIndex = Math.max(0, Math.min(state.players.length - 1, action.playerIndex));
      return touch({
        ...state,
        startingPlayerIndex: playerIndex,
        currentPlayerIndex: playerIndex,
        phase: "category_spin",
      });
    }
    case "CATEGORY_LANDED":
      if (state.phase !== "category_spin") return state;
      return touch({
        ...state,
        selectedCategory: action.category,
        phase: state.categoryRerollUsed ? "loading_question" : "category_confirm",
      });
    case "REROLL_CATEGORY":
      if (state.phase !== "category_confirm" || state.categoryRerollUsed) return state;
      return touch({
        ...state,
        categoryRerollUsed: true,
        selectedCategory: null,
        phase: "category_spin",
      });
    case "ACCEPT_CATEGORY":
      if (state.phase !== "category_confirm" || !state.selectedCategory) return state;
      return touch({ ...state, phase: "loading_question" });
    case "QUESTION_LOADED":
      if (state.phase !== "loading_question") return state;
      return touch({
        ...state,
        currentQuestion: action.question,
        usedQuestionIds: state.usedQuestionIds.includes(action.question.id)
          ? state.usedQuestionIds
          : [...state.usedQuestionIds, action.question.id],
        phase: "question",
      });
    case "QUESTION_LOAD_FAILED":
      if (state.phase !== "loading_question") return state;
      return touch({
        ...state,
        selectedCategory: null,
        categoryRerollUsed: false,
        phase: "category_spin",
      });
    case "REVEAL_OPTION":
      if (
        state.phase !== "question" ||
        state.pendingRevealPosition !== null ||
        state.revealedPositions.includes(action.position) ||
        state.players[state.currentPlayerIndex]?.status !== "active"
      ) {
        return state;
      }
      return touch({ ...state, pendingRevealPosition: action.position });
    case "MARK_ANSWER": {
      if (state.phase !== "question" || state.pendingRevealPosition === null) return state;
      const players = [...state.players];
      const current = players[state.currentPlayerIndex];
      if (!current || current.status !== "active") return state;
      players[state.currentPlayerIndex] = action.correct
        ? {
            ...current,
            roundScore: current.roundScore + 1,
            hasAnsweredThisRound: true,
            lastAction: "answer",
          }
        : {
            ...current,
            roundScore: 0,
            status: "eliminated",
            hasAnsweredThisRound: true,
            lastAction: "fail",
          };
      const revealedPositions = [...state.revealedPositions, state.pendingRevealPosition];
      const intermediate = {
        ...state,
        players,
        revealedPositions,
        pendingRevealPosition: null,
      };
      if (revealedPositions.length === 12) return finishRound(intermediate, true);
      if (action.correct) return touch(intermediate);
      return advanceOrFinish(intermediate, players);
    }
    case "PASS": {
      if (state.phase !== "question" || state.pendingRevealPosition !== null) return state;
      const players = [...state.players];
      const current = players[state.currentPlayerIndex];
      if (!current || current.status !== "active" || !current.hasAnsweredThisRound) return state;
      players[state.currentPlayerIndex] = { ...current, lastAction: "pass" };
      return advanceOrFinish(state, players);
    }
    case "BANK": {
      if (state.phase !== "question" || state.pendingRevealPosition !== null) return state;
      const players = [...state.players];
      const current = players[state.currentPlayerIndex];
      if (!current || current.status !== "active" || !current.hasAnsweredThisRound) return state;
      players[state.currentPlayerIndex] = {
        ...current,
        totalScore: current.totalScore + current.roundScore,
        roundScore: 0,
        status: "banked",
        lastAction: "bank",
      };
      return advanceOrFinish(state, players);
    }
    case "NEXT_ROUND": {
      if (state.phase !== "round_summary" || state.startingPlayerIndex === null) return state;
      const nextStarter = (state.startingPlayerIndex + 1) % state.players.length;
      return touch({
        ...state,
        roundNumber: state.roundNumber + 1,
        players: state.players.map((player) => ({
          ...player,
          roundScore: 0,
          status: "active",
          hasAnsweredThisRound: false,
          lastAction: null,
        })),
        startingPlayerIndex: nextStarter,
        currentPlayerIndex: nextStarter,
        selectedCategory: null,
        categoryRerollUsed: false,
        currentQuestion: null,
        revealedPositions: [],
        pendingRevealPosition: null,
        phase: "category_spin",
      });
    }
    default:
      return state;
  }
}
