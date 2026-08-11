import { beforeEach, describe, expect, it, vi } from "vitest";
import { createGame, gameReducer } from "@/lib/game/reducer";
import type { Category, GameState, Question } from "@/lib/game/types";

const category: Category = {
  id: "11111111-1111-4111-8111-111111111111",
  slug: "geografia",
  name: "Geografía",
  color: "#31d7ff",
  icon: "◎",
  position: 1,
};

const question: Question = {
  id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  title: "Pregunta de prueba",
  type: "boolean",
  categorySlug: "geografia",
  categoryName: "Geografía",
  options: Array.from({ length: 12 }, (_, index) => ({
    position: index + 1,
    prompt: `Opción ${index + 1}`,
    answer: { value: true, display: "Sí" },
  })),
};

function playingState(playerCount = 3, targetScore = 20): GameState {
  let state = createGame(
    Array.from({ length: playerCount }, (_, index) => `Jugador ${index + 1}`),
    targetScore,
  );
  state = gameReducer(state, { type: "SELECT_STARTER", playerIndex: 1 });
  state = gameReducer(state, { type: "CATEGORY_LANDED", category });
  state = gameReducer(state, { type: "ACCEPT_CATEGORY" });
  state = gameReducer(state, { type: "QUESTION_LOADED", question });
  return state;
}

function answer(state: GameState, position: number, correct: boolean): GameState {
  state = gameReducer(state, { type: "REVEAL_OPTION", position });
  return gameReducer(state, { type: "MARK_ANSWER", correct });
}

describe("gameReducer", () => {
  beforeEach(() => {
    vi.stubGlobal("crypto", { randomUUID: () => "99999999-9999-4999-8999-999999999999" });
  });

  it("mantiene colores y asientos deterministas", () => {
    const state = createGame(["A", "B", "C", "D"], 30);
    expect(state.players.map((player) => player.seat)).toEqual([1, 2, 3, 4]);
    expect(state.players.map((player) => player.color.name)).toEqual(["Cian", "Magenta", "Lima", "Ámbar"]);
    expect(state.targetScore).toBe(30);
  });

  it("impide pasar o plantarse antes del primer intento", () => {
    const state = playingState();
    expect(gameReducer(state, { type: "PASS" })).toBe(state);
    expect(gameReducer(state, { type: "BANK" })).toBe(state);
  });

  it("suma un acierto provisional y conserva el turno", () => {
    const state = answer(playingState(), 1, true);
    expect(state.players[1].roundScore).toBe(1);
    expect(state.players[1].totalScore).toBe(0);
    expect(state.currentPlayerIndex).toBe(1);
    expect(state.revealedPositions).toEqual([1]);
  });

  it("elimina los puntos de ronda tras un fallo", () => {
    let state = answer(playingState(), 1, true);
    state = answer(state, 2, true);
    state = answer(state, 3, true);
    expect(state.currentPlayerIndex).toBe(1);
    state = answer(state, 4, false);
    expect(state.players[1].roundScore).toBe(0);
    expect(state.players[1].status).toBe("eliminated");
    expect(state.currentPlayerIndex).toBe(2);
  });

  it("pasar salta solo el turno y mantiene al asiento activo", () => {
    let state = answer(playingState(), 1, true);
    expect(state.currentPlayerIndex).toBe(1);
    state = gameReducer(state, { type: "PASS" });
    expect(state.players[1].status).toBe("active");
    expect(state.players[1].roundScore).toBe(1);
    expect(state.currentPlayerIndex).toBe(2);
  });

  it("plantarse guarda puntos y retira al asiento de la ronda", () => {
    let state = answer(playingState(), 1, true);
    state = gameReducer(state, { type: "BANK" });
    expect(state.players[1].status).toBe("banked");
    expect(state.players[1].roundScore).toBe(0);
    expect(state.players[1].totalScore).toBe(1);
    expect(state.currentPlayerIndex).toBe(2);
  });

  it("mantiene la misma pregunta hasta que todos se plantan o quedan eliminados", () => {
    let state = playingState();
    const questionId = state.currentQuestion?.id;

    state = answer(state, 1, true); // Jugador 2 conserva el turno
    state = gameReducer(state, { type: "PASS" }); // Turno de Jugador 3
    state = answer(state, 2, true);
    state = gameReducer(state, { type: "BANK" }); // Jugador 3 se planta; turno de Jugador 1
    state = answer(state, 3, false); // Jugador 1 eliminado; vuelve Jugador 2

    expect(state.phase).toBe("question");
    expect(state.currentQuestion?.id).toBe(questionId);
    expect(state.currentPlayerIndex).toBe(1);
    expect(state.players.map((player) => player.status)).toEqual(["eliminated", "active", "banked"]);

    state = gameReducer(state, { type: "BANK" });
    expect(state.phase).toBe("round_summary");
  });

  it("permite al último asiento activo seguir jugando consigo mismo", () => {
    let state = playingState(2);
    state = answer(state, 1, false); // Jugador 2 fuera; turno de Jugador 1
    state = answer(state, 2, true);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.players[0].status).toBe("active");
  });

  it("rota el asiento inicial en cada nueva ronda", () => {
    let state = playingState(2);
    state = answer(state, 1, false);
    state = answer(state, 2, true);
    state = gameReducer(state, { type: "BANK" });
    expect(state.phase).toBe("round_summary");
    state = gameReducer(state, { type: "NEXT_ROUND" });
    expect(state.startingPlayerIndex).toBe(0);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.roundNumber).toBe(2);
  });

  it("declara ganador al terminar la ronda, no a mitad del turno", () => {
    let state = playingState(2, 1);
    state = answer(state, 1, false);
    state = answer(state, 2, true);
    expect(state.status).toBe("in_progress");
    state = gameReducer(state, { type: "BANK" });
    expect(state.status).toBe("finished");
    expect(state.phase).toBe("game_over");
    expect(state.winners).toEqual([0]);
  });

  it("obliga a aceptar el resultado del segundo giro", () => {
    let state = createGame(["A", "B"], 20);
    state = gameReducer(state, { type: "SELECT_STARTER", playerIndex: 0 });
    state = gameReducer(state, { type: "CATEGORY_LANDED", category });
    state = gameReducer(state, { type: "REROLL_CATEGORY" });
    expect(state.categoryRerollUsed).toBe(true);
    state = gameReducer(state, { type: "CATEGORY_LANDED", category });
    expect(state.phase).toBe("loading_question");
  });
});
