import { readFile } from "node:fs/promises";

const questions = JSON.parse(await readFile("data/questions.json", "utf8"));
const errors = [];
const validTypes = new Set(["boolean", "number", "order", "period", "color", "free_text"]);
const expectedCategories = ["geografia", "historia", "deportes", "entretenimiento"];
const ids = new Set();

for (const [index, question] of questions.entries()) {
  const label = `Pregunta ${index + 1} (${question.id ?? "sin id"})`;
  if (ids.has(question.id)) errors.push(`${label}: id duplicado`);
  ids.add(question.id);
  if (!validTypes.has(question.type)) errors.push(`${label}: tipo inválido`);
  if (!expectedCategories.includes(question.category_slug)) errors.push(`${label}: categoría inválida`);
  if (typeof question.title !== "string" || question.title.length < 8) errors.push(`${label}: título inválido`);
  if (!Array.isArray(question.options) || question.options.length !== 12) {
    errors.push(`${label}: no tiene exactamente 12 opciones`);
    continue;
  }
  const positions = new Set();
  for (const option of question.options) {
    positions.add(option.position);
    if (!Number.isInteger(option.position) || option.position < 1 || option.position > 12) errors.push(`${label}: posición inválida`);
    if (!option.prompt?.trim()) errors.push(`${label}: opción sin texto`);
    if (!option.answer || !("value" in option.answer) || !String(option.answer.display).trim()) errors.push(`${label}: respuesta inválida`);
  }
  if (positions.size !== 12) errors.push(`${label}: posiciones duplicadas`);
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
}

for (const category of expectedCategories) {
  const categoryQuestions = questions.filter((question) => question.category_slug === category);
  if (categoryQuestions.length !== 100) errors.push(`${category}: ${categoryQuestions.length} preguntas; se esperaban 100`);
}

if (questions.length !== 400) errors.push(`Total: ${questions.length}; se esperaban 400`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  const typeCounts = Object.fromEntries([...validTypes].map((type) => [type, questions.filter((q) => q.type === type).length]));
  console.log(`Contenido válido: ${questions.length} preguntas y ${questions.length * 12} opciones.`);
  console.log(typeCounts);
}
