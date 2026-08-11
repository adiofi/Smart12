// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { createGame } from "@/lib/game/reducer";
import { clearSavedGame, readSavedGame, saveGame } from "@/lib/game/storage";
import { GAME_STORAGE_KEY } from "@/lib/game/types";

describe("persistencia local", () => {
  beforeEach(() => window.localStorage.clear());

  it("guarda y recupera una partida válida", () => {
    const game = createGame(["Equipo A", "Equipo B"], 30);
    saveGame(game);
    expect(readSavedGame()).toEqual(game);
  });

  it("ignora estados incompatibles o finalizados", () => {
    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }));
    expect(readSavedGame()).toBeNull();

    const game = { ...createGame(["A", "B"], 20), status: "finished" };
    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(game));
    expect(readSavedGame()).toBeNull();
  });

  it("elimina la copia recuperable", () => {
    saveGame(createGame(["A", "B"], 20));
    clearSavedGame();
    expect(window.localStorage.getItem(GAME_STORAGE_KEY)).toBeNull();
  });
});
