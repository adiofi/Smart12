import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const component = readFileSync(new URL("../components/game-app.tsx", import.meta.url), "utf8");

describe("regresiones responsive de la rueda", () => {
  it("no sustituye la transformación circular al pulsar un tapón", () => {
    const activeRule = css.match(/button:not\(:disabled\):active\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(activeRule).not.toContain("transform:");
    expect(activeRule).toContain("scale:");
    expect(css).toMatch(/\.question-cap[^{}]*\{[^}]*transform:/s);
  });

  it("reserva una zona propia para los controles de ronda", () => {
    expect(component).toContain('className="question-footer"');
    expect(css).toMatch(/\.question-layout\s*\{[^}]*grid-template-rows:/s);
    expect(css).toMatch(/\.question-footer\s*\{[^}]*grid-row:\s*3/s);
  });
});
