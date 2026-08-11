import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/questions/random/route";

describe("API de preguntas", () => {
  it("devuelve una tarjeta completa de la categoría solicitada", async () => {
    const request = new Request("http://localhost/api/questions/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorySlug: "historia", excludedIds: [] }),
    });
    const response = await POST(request);
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload.source).toBe("bundled");
    expect(payload.question.categorySlug).toBe("historia");
    expect(payload.question.options).toHaveLength(12);
  });

  it("nunca devuelve un identificador excluido", async () => {
    const firstResponse = await POST(new Request("http://localhost/api/questions/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorySlug: "geografia", excludedIds: [] }),
    }));
    const first = await firstResponse.json();
    const secondResponse = await POST(new Request("http://localhost/api/questions/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorySlug: "geografia", excludedIds: [first.question.id] }),
    }));
    const second = await secondResponse.json();
    expect(second.question.id).not.toBe(first.question.id);
  });

  it("rechaza categorías vacías", async () => {
    const response = await POST(new Request("http://localhost/api/questions/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorySlug: "", excludedIds: [] }),
    }));
    expect(response.status).toBe(400);
  });
});
