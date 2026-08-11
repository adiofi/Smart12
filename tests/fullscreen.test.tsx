// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GameApp } from "@/components/game-app";

describe("modo de pantalla completa", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ categories: [] }),
    }));
  });

  it("solicita pantalla completa al entrar al plató", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(document.documentElement, "requestFullscreen", {
      configurable: true,
      value: requestFullscreen,
    });

    render(<GameApp />);
    fireEvent.click(screen.getByRole("button", { name: "Nueva partida" }));
    fireEvent.click(screen.getByRole("button", { name: /Entrar al plató/i }));

    await waitFor(() => expect(requestFullscreen).toHaveBeenCalledWith({ navigationUI: "hide" }));
  });
});
