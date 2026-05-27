import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { craftingStations } from "@/data/crafting-stations";
import { crops } from "@/data/crops";
import { drinks } from "@/data/drinks";
import { fish } from "@/data/fish";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { recipes } from "@/data/recipes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    ...categories.map((category) => category.href),
    "/tools/profit-calculator",
    "/tools/brewing-guide",
    "/tools/aging-guide",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const detailRoutes = [
    ...recipes.map((item) => `/recipes/${item.slug}`),
    ...drinks.map((item) => `/drinks/${item.slug}`),
    ...ingredients.map((item) => `/ingredients/${item.slug}`),
    ...crops.map((item) => `/crops/${item.slug}`),
    ...fish.map((item) => `/fish/${item.slug}`),
    ...craftingStations.map((item) => `/crafting/${item.slug}`),
    ...guides.map((item) => `/guides/${item.slug}`),
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...detailRoutes];
}
