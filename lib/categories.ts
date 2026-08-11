import type { Category } from "@/lib/game/types";

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "geografia",
    name: "Geografía",
    color: "#31d7ff",
    icon: "◎",
    position: 1,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "historia",
    name: "Historia",
    color: "#ff9f43",
    icon: "⌛",
    position: 2,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    slug: "deportes",
    name: "Deportes",
    color: "#9bf15d",
    icon: "◇",
    position: 3,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    slug: "entretenimiento",
    name: "Entretenimiento",
    color: "#ff4fa3",
    icon: "★",
    position: 4,
  },
];
