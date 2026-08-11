import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type BankQuestion = {
  category_slug: string;
  family: string;
  title: string;
  type: string;
  options: Array<{ answer: { value: string | number | boolean } }>;
};

const questions = JSON.parse(
  readFileSync(new URL("../data/questions.json", import.meta.url), "utf8"),
) as BankQuestion[];

const expectedCounts: Record<string, number> = {
  geografia: 100,
  historia: 100,
  deportes: 100,
  entretenimiento: 150,
  ciencia: 100,
};

function hasExactYearAnswers(question: BankQuestion) {
  if (question.type !== "number") return false;
  const values = question.options
    .map((option) => option.answer.value)
    .filter((value): value is number => typeof value === "number" && Number.isInteger(value));
  return /año|fecha|estren|public|lanz|aparec|ocurri|fundad|descubiert/i.test(question.title)
    || values.filter((value) => (value >= 1000 && value <= 2100) || (value < 0 && value >= -3000)).length >= 6;
}

describe("reglas editoriales del banco", () => {
  it("contiene 550 tarjetas con la distribución pactada", () => {
    expect(questions).toHaveLength(550);
    for (const [category, expected] of Object.entries(expectedCounts)) {
      expect(questions.filter((question) => question.category_slug === category)).toHaveLength(expected);
    }
  });

  it("incluye exactamente 50 tarjetas editoriales de música", () => {
    const music = questions.filter(
      (question) => question.category_slug === "entretenimiento" && question.family.startsWith("musica-"),
    );
    expect(music).toHaveLength(50);
  });

  it("no utiliza años exactos como respuesta", () => {
    expect(questions.filter(hasExactYearAnswers)).toEqual([]);
  });

  it("limita siglos y décadas al 17 % de cada categoría", () => {
    for (const [category, total] of Object.entries(expectedCounts)) {
      const periods = questions.filter(
        (question) => question.category_slug === category && question.type === "period",
      );
      expect(periods.length).toBeLessThanOrEqual(Math.floor(total * 0.17));
    }
  });
});
