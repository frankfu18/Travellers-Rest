import type { MetadataRoute } from "next";
import { craftingStations } from "@/data/crafting-stations";
import { crops } from "@/data/crops";
import { drinks } from "@/data/drinks";
import { fish } from "@/data/fish";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { recipes } from "@/data/recipes";
import { siteConfig } from "@/lib/site";
import type { DatabaseEntry } from "@/types/content";

function canIndexEntry(entry: DatabaseEntry): boolean {
  return entry.dataStatus === "verified" || entry.dataStatus === "completed";
}

function routeForEntry(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return `/recipes/${entry.slug}`;
  if (entry.kind === "drink") return `/drinks/${entry.slug}`;
  if (entry.kind === "ingredient") return `/ingredients/${entry.slug}`;
  if (entry.kind === "crop") return `/crops/${entry.slug}`;
  if (entry.kind === "fish") return `/fish/${entry.slug}`;
  return `/crafting/${entry.slug}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const databaseGroups = [
    { route: "/recipes", items: recipes },
    { route: "/ingredients", items: ingredients },
    { route: "/drinks", items: drinks },
    { route: "/crops", items: crops },
    { route: "/fish", items: fish },
    { route: "/crafting", items: craftingStations },
  ];
  const categoryRoutes = databaseGroups.filter((group) => group.items.length > 0 && group.items.every(canIndexEntry)).map((group) => group.route);
  const detailRoutes = databaseGroups.flatMap((group) => group.items.filter(canIndexEntry).map(routeForEntry));
  const routes = ["", "/guides", ...guides.map((item) => `/guides/${item.slug}`), ...categoryRoutes, ...detailRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/guides" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/guides" ? 0.9 : 0.8,
  }));
}
