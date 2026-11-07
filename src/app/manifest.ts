import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yashvardhan Borude — Software Engineer & Builder",
    short_name: "Yashvardhan",
    description:
      "Official portfolio of Yashvardhan Borude. Computer Engineering student at PCCOE Pune building resilient full-stack systems, production PostgreSQL architectures, and high-performance WebGL platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090B",
    theme_color: "#08090B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48 32x32 16x16",
        type: "image/x-icon",
      },
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
