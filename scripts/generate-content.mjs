import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildGeographyQuestions } from "./content/geography.mjs";
import { buildHistoryQuestions } from "./content/history.mjs";
import { buildSportsQuestions } from "./content/sports.mjs";
import { buildEntertainmentQuestions } from "./content/entertainment.mjs";
import { buildScienceQuestions } from "./content/science.mjs";

const questions = [
  ...buildGeographyQuestions(),
  ...buildHistoryQuestions(),
  ...buildSportsQuestions(),
  ...buildEntertainmentQuestions(),
  ...buildScienceQuestions(),
];

const dataPath = resolve("data/questions.json");
await mkdir(resolve("data"), { recursive: true });

await writeFile(dataPath, `${JSON.stringify(questions, null, 2)}\n`, "utf8");

const totals = Object.groupBy(questions, (question) => question.category_slug);
for (const [category, values] of Object.entries(totals)) {
  console.log(`${category}: ${values.length}`);
}
console.log(`Banco JSON generado: ${questions.length} preguntas.`);
