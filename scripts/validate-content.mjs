import { readFile } from "node:fs/promises";

const questions = JSON.parse(await readFile("data/questions.json", "utf8"));
const errors = [];
const validTypes = new Set(["boolean", "number", "order", "period", "color", "free_text"]);
const expectedCategoryCounts = {
  geografia: 100,
  historia: 100,
  deportes: 100,
  entretenimiento: 150,
  ciencia: 100,
};
const expectedCategories = Object.keys(expectedCategoryCounts);
const ids = new Set();

function hasExactYearAnswers(question) {
  if (question.type !== "number") return false;
  const numericValues = question.options
    .map((option) => option.answer?.value)
    .filter((value) => typeof value === "number" && Number.isInteger(value));
  const chronologicalTitle = /año|fecha|estren|public|lanz|aparec|ocurri|fundad|descubiert/i.test(question.title);
  const likelyYears = numericValues.filter((value) => (value >= 1000 && value <= 2100) || (value < 0 && value >= -3000));
  return chronologicalTitle || likelyYears.length >= 6;
}

for (const [index, question] of questions.entries()) {
  const label = `Pregunta ${index + 1} (${question.id ?? "sin id"})`;
  if (ids.has(question.id)) errors.push(`${label}: id duplicado`);
  ids.add(question.id);
  if (!validTypes.has(question.type)) errors.push(`${label}: tipo inválido`);
  if (!expectedCategories.includes(question.category_slug)) errors.push(`${label}: categoría inválida`);
  if (typeof question.family !== "string" || !question.family.trim()) errors.push(`${label}: familia editorial inválida`);
  if (typeof question.title !== "string" || question.title.length < 8) errors.push(`${label}: título inválido`);
  if (!Array.isArray(question.options) || question.options.length !== 12) {
    errors.push(`${label}: no tiene exactamente 12 opciones`);
    continue;
  }
  const positions = new Set();
  const prompts = new Set();
  for (const option of question.options) {
    positions.add(option.position);
    prompts.add(option.prompt.trim().toLocaleLowerCase("es"));
    if (!Number.isInteger(option.position) || option.position < 1 || option.position > 12) errors.push(`${label}: posición inválida`);
    if (!option.prompt?.trim()) errors.push(`${label}: opción sin texto`);
    if (!option.answer || !("value" in option.answer) || !String(option.answer.display).trim()) errors.push(`${label}: respuesta inválida`);
  }
  if (positions.size !== 12) errors.push(`${label}: posiciones duplicadas`);
  if (prompts.size !== 12) errors.push(`${label}: opciones de texto duplicadas`);
  if (question.type === "boolean") {
    const booleanValues = new Set(question.options.map((option) => option.answer.value));
    if (!booleanValues.has(true) || !booleanValues.has(false)) errors.push(`${label}: pregunta binaria sin mezcla de sí y no`);
  }
  if (question.type === "order") {
    const ranks = question.options.map((option) => option.answer.value).sort((a, b) => a - b);
    if (ranks.join(",") !== "1,2,3,4,5,6,7,8,9,10,11,12") errors.push(`${label}: orden sin doce rangos únicos`);
  }
  if (question.type === "color" && question.options.some((option) => !/^#[0-9a-f]{6}$/i.test(option.answer.colorHex ?? ""))) {
    errors.push(`${label}: respuesta de color sin hexadecimal válido`);
  }
  if (hasExactYearAnswers(question)) errors.push(`${label}: contiene respuestas de año exacto; debe usar siglo o década`);
}

for (const category of expectedCategories) {
  const categoryQuestions = questions.filter((question) => question.category_slug === category);
  const expectedCount = expectedCategoryCounts[category];
  if (categoryQuestions.length !== expectedCount) errors.push(`${category}: ${categoryQuestions.length} preguntas; se esperaban ${expectedCount}`);
  const periodCount = categoryQuestions.filter((question) => question.type === "period").length;
  const periodLimit = Math.floor(expectedCount * 0.17);
  if (periodCount > periodLimit) errors.push(`${category}: ${periodCount} preguntas de siglo/década; el máximo es ${periodLimit}`);
}

const musicQuestions = questions.filter(
  (question) => question.category_slug === "entretenimiento" && question.family.startsWith("musica-"),
);
if (musicQuestions.length !== 50) errors.push(`Música: ${musicQuestions.length} preguntas; se esperaban 50`);

if (questions.length !== 550) errors.push(`Total: ${questions.length}; se esperaban 550`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  const typeCounts = Object.fromEntries([...validTypes].map((type) => [type, questions.filter((q) => q.type === type).length]));
  console.log(`Contenido válido: ${questions.length} preguntas y ${questions.length * 12} opciones.`);
  console.log(typeCounts);
}
