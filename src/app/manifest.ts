import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yashvardhan Borude — Portfolio",
    short_name: "Yashvardhan",
    description:
      "Personal portfolio of Yashvardhan Borude. Computer engineering student at PCCOE Pune building resilient web systems and computational software.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090B",
    theme_color: "#08090B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
