import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smart 12",
    short_name: "Smart 12",
    description: "Concurso de cultura general para 2 a 4 equipos",
    start_url: "/",
    scope: "/",
    display: "fullscreen",
    orientation: "landscape",
    background_color: "#040713",
    theme_color: "#050918",
    icons: [
      {
        src: "/smart12-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
