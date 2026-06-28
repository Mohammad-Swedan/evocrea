import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EvoCrea — Digital Business Systems",
    short_name: "EvoCrea",
    description:
      "Powerful digital systems and smart business solutions for modern businesses.",
    start_url: "/en",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#ff5c28",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
