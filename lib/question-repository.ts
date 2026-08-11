import { DEFAULT_CATEGORIES } from "@/lib/categories";
import bundledQuestions from "@/data/questions.json";
import type { Category, Question, QuestionOption, QuestionType } from "@/lib/game/types";

type BundledQuestion = {
  id: string;
  title: string;
  type: QuestionType;
  category_slug: string;
  options: QuestionOption[];
  active?: boolean;
};

const QUESTIONS_BY_CATEGORY = new Map(
  DEFAULT_CATEGORIES.map((category) => [
    category.slug,
    (bundledQuestions as BundledQuestion[]).filter(
      (question) => question.category_slug === category.slug && question.active !== false,
    ),
  ]),
);

export function getCategories(): Category[] {
  return DEFAULT_CATEGORIES;
}

function randomBundledQuestion(categorySlug: string, excludedIds: string[]): Question | null {
  const category = DEFAULT_CATEGORIES.find((item) => item.slug === categorySlug);
  const excluded = new Set(excludedIds);
  const eligible = (QUESTIONS_BY_CATEGORY.get(categorySlug) ?? []).filter(
    (question) => !excluded.has(question.id),
  );
  if (!eligible.length) return null;
  const selected = eligible[Math.floor(Math.random() * eligible.length)];
  return {
    id: selected.id,
    title: selected.title,
    type: selected.type,
    categorySlug: selected.category_slug,
    categoryName: category?.name ?? selected.category_slug,
    options: selected.options,
  };
}

export async function getRandomQuestion(
  categorySlug: string,
  excludedIds: string[],
): Promise<{ question: Question | null; exhausted: boolean; source: "bundled" }> {
  const question = randomBundledQuestion(categorySlug, excludedIds);
  return {
    question,
    exhausted: question === null,
    source: "bundled",
  };
}
