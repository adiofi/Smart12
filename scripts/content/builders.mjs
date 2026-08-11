import { createHash } from "node:crypto";

export function rows(source, keys) {
  return source.trim().split("\n").filter(Boolean).map((line) => {
    const values = line.split("|").map((value) => value.trim());
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  });
}

export function stableUuid(key) {
  const hash = createHash("sha256").update(key).digest("hex").slice(0, 32).split("");
  hash[12] = "4";
  hash[16] = ["8", "9", "a", "b"][Number.parseInt(hash[16], 16) % 4];
  const value = hash.join("");
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}

function seededNumber(key) {
  return Number.parseInt(createHash("sha256").update(key).digest("hex").slice(0, 8), 16);
}

function seededShuffle(items, key) {
  return [...items]
    .map((item, index) => ({ item, weight: seededNumber(`${key}:${index}`) }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ item }) => item);
}

function chooseTwelve(items, family, variant) {
  if (items.length < 12) throw new Error(`${family} necesita al menos 12 hechos.`);
  const shuffled = seededShuffle(items, `${family}:${variant}`);
  return shuffled.slice(0, 12);
}

function chooseBalancedTwelve(items, family, variant, balanceBy) {
  const positive = items.filter((item) => Boolean(balanceBy(item)));
  const negative = items.filter((item) => !balanceBy(item));
  if (!positive.length || !negative.length) return chooseTwelve(items, family, variant);
  const positiveCount = Math.min(6, positive.length);
  const negativeCount = Math.min(6, negative.length);
  let chosen = [
    ...seededShuffle(positive, `${family}:${variant}:positive`).slice(0, positiveCount),
    ...seededShuffle(negative, `${family}:${variant}:negative`).slice(0, negativeCount),
  ];
  if (chosen.length < 12) {
    const chosenSet = new Set(chosen);
    chosen = [
      ...chosen,
      ...seededShuffle(items.filter((item) => !chosenSet.has(item)), `${family}:${variant}:fill`).slice(0, 12 - chosen.length),
    ];
  }
  return seededShuffle(chosen, `${family}:${variant}:final`);
}

function chooseTwelveWithUniqueValues(items, family, variant, valueOf) {
  const chosen = [];
  const values = new Set();
  for (const item of seededShuffle(items, `${family}:${variant}:unique`)) {
    const value = String(valueOf(item));
    if (values.has(value)) continue;
    values.add(value);
    chosen.push(item);
    if (chosen.length === 12) return chosen;
  }
  throw new Error(`${family} necesita al menos 12 valores de orden distintos.`);
}

export function answer(value, display = String(value), extra = {}) {
  return { value, display, ...extra };
}

export function mappedCards({
  category,
  family,
  title,
  type,
  items,
  count,
  prompt,
  response,
  difficulty = 2,
  balanceBy,
}) {
  return Array.from({ length: count }, (_, variant) => {
    const selected = balanceBy
      ? chooseBalancedTwelve(items, `${category}:${family}`, variant, balanceBy)
      : chooseTwelve(items, `${category}:${family}`, variant);
    return makeQuestion({
      category,
      family,
      variant,
      title: typeof title === "function" ? title(variant) : title,
      type,
      difficulty: typeof difficulty === "function" ? difficulty(variant) : difficulty,
      options: selected.map((item, index) => ({
        position: index + 1,
        prompt: prompt(item, variant),
        answer: response(item, variant),
      })),
    });
  });
}

export function orderCards({ category, family, title, items, count, prompt, sortValue, direction = "asc", difficulty = 3 }) {
  return Array.from({ length: count }, (_, variant) => {
    const selected = chooseTwelveWithUniqueValues(items, `${category}:${family}`, variant, sortValue);
    const sorted = [...selected].sort((a, b) => {
      const result = Number(sortValue(a)) - Number(sortValue(b));
      return direction === "asc" ? result : -result;
    });
    const rank = new Map(sorted.map((item, index) => [item, index + 1]));
    return makeQuestion({
      category,
      family,
      variant,
      title,
      type: "order",
      difficulty,
      options: selected.map((item, index) => ({
        position: index + 1,
        prompt: prompt(item, variant),
        answer: answer(rank.get(item), `${rank.get(item)}.º`),
      })),
    });
  });
}

function makeQuestion({ category, family, variant, title, type, difficulty, options }) {
  return {
    id: stableUuid(`smart12:${category}:${family}:${variant}`),
    family,
    title,
    type,
    category_slug: category,
    options,
    difficulty,
    active: true,
    source_note: "Banco editorial Smart 12 · hechos estables revisados para la edición inicial",
    reviewed_at: "2026-08-11",
  };
}

export function century(year) {
  const numericYear = Number(year);
  if (numericYear < 0) return `Siglo ${roman(Math.ceil(Math.abs(numericYear) / 100))} a. C.`;
  return `Siglo ${roman(Math.ceil(numericYear / 100))}`;
}

export function decade(year) {
  const start = Math.floor(Number(year) / 10) * 10;
  return `Década de ${start}`;
}

export function displayYear(year) {
  const numericYear = Number(year);
  return numericYear < 0 ? `${Math.abs(numericYear)} a. C.` : String(numericYear);
}

function roman(number) {
  const values = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let remaining = number;
  let result = "";
  for (const [value, symbol] of values) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}
