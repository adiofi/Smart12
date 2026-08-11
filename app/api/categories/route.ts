import { NextResponse } from "next/server";
import { getCategories } from "@/lib/question-repository";

export const dynamic = "force-static";

export async function GET() {
  try {
    return NextResponse.json({ categories: await getCategories() });
  } catch {
    return NextResponse.json({ error: "No se pudieron cargar las categorías." }, { status: 500 });
  }
}
