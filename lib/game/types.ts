export const GAME_STORAGE_KEY = "smart12:last-game";
export const GAME_SCHEMA_VERSION = 1;

export type QuestionType =
  | "boolean"
  | "number"
  | "order"
  | "period"
  | "color"
  | "free_text";

export type Category = {
  id: string;
  slug: string;
  name: string;
  color: string;
  icon: string;
  position: number;
};

export type QuestionAnswer = {
  display: string;
  value: string | number | boolean;
  accepted?: string[];
  colorHex?: string;
};

export type QuestionOption = {
  position: number;
  prompt: string;
  answer: QuestionAnswer;
};

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  categorySlug: string;
  categoryName: string;
  options: QuestionOption[];
};

export type SeatColor = {
  name: string;
  value: string;
  glow: string;
};

export const SEAT_COLORS: SeatColor[] = [
  { name: "Cian", value: "#31d7ff", glow: "rgba(49, 215, 255, .42)" },
  { name: "Magenta", value: "#ff4fa3", glow: "rgba(255, 79, 163, .42)" },
  { name: "Lima", value: "#9bf15d", glow: "rgba(155, 241, 93, .4)" },
  { name: "Ámbar", value: "#ffc857", glow: "rgba(255, 200, 87, .42)" },
];

export type RoundPlayerStatus = "active" | "banked" | "eliminated";

export type Player = {
  seat: number;
  name: string;
  color: SeatColor;
  totalScore: number;
  roundScore: number;
  status: RoundPlayerStatus;
  hasAnsweredThisRound: boolean;
  lastAction: "answer" | "pass" | "bank" | "fail" | null;
};

export type GamePhase =
  | "selecting_starter"
  | "category_spin"
  | "category_confirm"
  | "loading_question"
  | "question"
  | "round_summary"
  | "game_over";

export type GameState = {
  schemaVersion: typeof GAME_SCHEMA_VERSION;
  gameId: string;
  status: "in_progress" | "finished";
  phase: GamePhase;
  createdAt: string;
  updatedAt: string;
  targetScore: number;
  roundNumber: number;
  players: Player[];
  startingPlayerIndex: number | null;
  currentPlayerIndex: number;
  selectedCategory: Category | null;
  categoryRerollUsed: boolean;
  currentQuestion: Question | null;
  revealedPositions: number[];
  pendingRevealPosition: number | null;
  usedQuestionIds: string[];
  winners: number[];
};

export type GameAction =
  | { type: "SELECT_STARTER"; playerIndex: number }
  | { type: "CATEGORY_LANDED"; category: Category }
  | { type: "REROLL_CATEGORY" }
  | { type: "ACCEPT_CATEGORY" }
  | { type: "QUESTION_LOADED"; question: Question }
  | { type: "QUESTION_LOAD_FAILED" }
  | { type: "REVEAL_OPTION"; position: number }
  | { type: "MARK_ANSWER"; correct: boolean }
  | { type: "PASS" }
  | { type: "BANK" }
  | { type: "NEXT_ROUND" };
