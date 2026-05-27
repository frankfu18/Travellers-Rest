import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/guides", ...guides.map((item) => `/guides/${item.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/guides" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/guides" ? 0.9 : 0.8,
  }));
}
