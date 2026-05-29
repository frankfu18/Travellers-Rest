import { craftingStations } from "../data/crafting-stations";
import { crops } from "../data/crops";
import { drinks } from "../data/drinks";
import { fish } from "../data/fish";
import { guides } from "../data/guides";
import { ingredients } from "../data/ingredients";
import { recipes } from "../data/recipes";
import { tools } from "../data/tools";
import type { DataStatus } from "../types/content";

export type SearchItemType = "guide" | "recipe" | "drink" | "ingredient" | "crop" | "fish" | "station" | "tool";

export type SearchItem = {
  title: string;
  slug: string;
  href: string;
  type: SearchItemType;
  category?: string;
  description: string;
  keywords: string[];
  dataStatus?: DataStatus;
};

export type SearchResult = SearchItem & {
  score: number;
};

export const popularSearches = [
  "beginner guide",
  "best early game recipes",
  "make money",
  "brewing",
  "aging",
  "beer",
  "roast fish",
  "vegetable stew",
  "apple pie",
  "crops",
  "fishing",
  "profit calculator",
];

const typePriority: Record<SearchItemType, number> = {
  guide: 0,
  recipe: 1,
  drink: 2,
  ingredient: 3,
  crop: 4,
  fish: 5,
  station: 6,
  tool: 7,
};

export const searchIndex: SearchItem[] = [
  ...guides.map((guide) => ({
    title: guide.title,
    slug: guide.slug,
    href: `/guides/${guide.slug}`,
    type: "guide" as const,
    category: guide.category,
    description: guide.description,
    keywords: guide.keywords,
  })),
  ...recipes.map((recipe) => ({
    title: recipe.name,
    slug: recipe.slug,
    href: `/recipes/${recipe.slug}`,
    type: "recipe" as const,
    category: recipe.category,
    description: recipe.description,
    keywords: recipe.keywords,
    dataStatus: recipe.dataStatus,
  })),
  ...drinks.map((drink) => ({
    title: drink.name,
    slug: drink.slug,
    href: `/drinks/${drink.slug}`,
    type: "drink" as const,
    category: drink.category,
    description: drink.description,
    keywords: drink.keywords,
    dataStatus: drink.dataStatus,
  })),
  ...ingredients.map((ingredient) => ({
    title: ingredient.name,
    slug: ingredient.slug,
    href: `/ingredients/${ingredient.slug}`,
    type: "ingredient" as const,
    category: ingredient.category,
    description: ingredient.description,
    keywords: ingredient.keywords,
    dataStatus: ingredient.dataStatus,
  })),
  ...crops.map((crop) => ({
    title: crop.name,
    slug: crop.slug,
    href: `/crops/${crop.slug}`,
    type: "crop" as const,
    category: crop.category,
    description: crop.description,
    keywords: crop.keywords,
    dataStatus: crop.dataStatus,
  })),
  ...fish.map((item) => ({
    title: item.name,
    slug: item.slug,
    href: `/fish/${item.slug}`,
    type: "fish" as const,
    category: item.category,
    description: item.description,
    keywords: item.keywords,
    dataStatus: item.dataStatus,
  })),
  ...craftingStations.map((station) => ({
    title: station.name,
    slug: station.slug,
    href: `/crafting/${station.slug}`,
    type: "station" as const,
    category: station.category,
    description: station.description,
    keywords: station.keywords,
    dataStatus: station.dataStatus,
  })),
  ...tools.map((tool) => ({
    title: tool.title,
    slug: tool.slug,
    href: tool.href,
    type: "tool" as const,
    category: tool.category,
    description: tool.description,
    keywords: tool.keywords,
    dataStatus: tool.dataStatus,
  })),
];

export function searchItems(query: string): SearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  return searchIndex
    .map((item) => ({ ...item, score: scoreItem(item, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const typeDelta = typePriority[a.type] - typePriority[b.type];
      if (typeDelta !== 0) return typeDelta;
      return a.title.localeCompare(b.title);
    });
}

export function validateSearchIndex(items: SearchItem[] = searchIndex): string[] {
  const errors: string[] = [];
  const validTypes = new Set<SearchItemType>(["guide", "recipe", "drink", "ingredient", "crop", "fish", "station", "tool"]);
  const seenHrefs = new Set<string>();

  for (const item of items) {
    if (!item.title.trim()) errors.push(`Empty title for href: ${item.href || "(missing href)"}`);
    if (!item.href.trim()) errors.push(`Empty href for title: ${item.title || "(missing title)"}`);
    if (!validTypes.has(item.type)) errors.push(`Invalid type for ${item.title}: ${item.type}`);
    if (seenHrefs.has(item.href)) errors.push(`Duplicate href: ${item.href}`);
    seenHrefs.add(item.href);
    if (!item.description.trim()) errors.push(`Empty description for ${item.title}`);
    if (item.keywords.length === 0) errors.push(`Empty keywords for ${item.title}`);
  }

  return errors;
}

function scoreItem(item: SearchItem, normalizedQuery: string): number {
  const title = normalize(item.title);
  const description = normalize(item.description);
  const category = normalize(item.category ?? "");
  const type = normalize(item.type);
  const keywords = item.keywords.map(normalize);
  let score = 0;

  if (title === normalizedQuery) score += 100;
  if (title.includes(normalizedQuery)) score += 50;
  if (keywords.some((keyword) => keyword === normalizedQuery || keyword.includes(normalizedQuery))) score += 40;
  if (category.includes(normalizedQuery)) score += 25;
  if (description.includes(normalizedQuery)) score += 10;
  if (type.includes(normalizedQuery)) score += 10;

  return score;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
