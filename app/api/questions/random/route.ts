import { NextResponse } from "next/server";
import { z } from "zod";
import { getRandomQuestion } from "@/lib/question-repository";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  categorySlug: z.string().min(1).max(80),
  excludedIds: z.array(z.string().uuid()).max(1000).default([]),
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const result = await getRandomQuestion(body.categorySlug, body.excludedIds);
    if (!result.question) {
      return NextResponse.json(
        { error: "No quedan preguntas disponibles en esta categoría.", exhausted: true },
        { status: 404 },
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "La petición no es válida." }, { status: 400 });
    }
    return NextResponse.json({ error: "No se pudo seleccionar una pregunta." }, { status: 500 });
  }
}
