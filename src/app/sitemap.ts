import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://www.yashvardhanborude.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectUrls = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
