import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { recipes } from "@/data/recipes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", ...categories.map((category) => category.href)].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const detailRoutes = [
    ...recipes.map((item) => `/recipes/${item.slug}`),
    ...ingredients.map((item) => `/ingredients/${item.slug}`),
    ...guides.map((item) => `/guides/${item.slug}`),
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...detailRoutes];
}
