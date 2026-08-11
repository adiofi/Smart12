import { GAME_SCHEMA_VERSION, GAME_STORAGE_KEY, type GameState } from "./types";

export function readSavedGame(): GameState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GAME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (
      parsed.schemaVersion !== GAME_SCHEMA_VERSION ||
      parsed.status !== "in_progress" ||
      !Array.isArray(parsed.players) ||
      parsed.players.length < 2 ||
      parsed.players.length > 4
    ) {
      return null;
    }
    return parsed as GameState;
  } catch {
    return null;
  }
}

export function saveGame(game: GameState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(game));
  } catch {
    // El juego sigue funcionando aunque el navegador bloquee el almacenamiento.
  }
}

export function clearSavedGame(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(GAME_STORAGE_KEY);
  } catch {
    // Sin acción: el almacenamiento puede estar deshabilitado.
  }
}
