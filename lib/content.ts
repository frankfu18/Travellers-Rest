import { categories } from "@/data/categories";
import { craftingStations } from "@/data/crafting-stations";
import { crops } from "@/data/crops";
import { drinks } from "@/data/drinks";
import { fish } from "@/data/fish";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { recipes } from "@/data/recipes";
import type { CardItem, Category, CraftingStation, Crop, DatabaseEntry, Drink, Fish, Guide, Ingredient, Recipe } from "@/types/content";

export function getCategory(slug: string): Category {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`Unknown category: ${slug}`);
  }

  return category;
}

export function guideToCard(guide: Guide): CardItem {
  return {
    title: guide.title,
    href: `/guides/${guide.slug}`,
    description: guide.description,
    meta: guide.category,
  };
}

export function entryToCard(entry: DatabaseEntry): CardItem {
  return {
    title: entry.name,
    href: getEntryPath(entry),
    description: entry.description,
    meta: `${entry.category} - ${formatDataStatus(entry.dataStatus)}`,
  };
}

export function getEntryPath(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return `/recipes/${entry.slug}`;
  if (entry.kind === "drink") return `/drinks/${entry.slug}`;
  if (entry.kind === "ingredient") return `/ingredients/${entry.slug}`;
  if (entry.kind === "crop") return `/crops/${entry.slug}`;
  if (entry.kind === "fish") return `/fish/${entry.slug}`;
  return `/crafting/${entry.slug}`;
}

export function formatDataStatus(status: DatabaseEntry["dataStatus"]): string {
  const labels: Record<DatabaseEntry["dataStatus"], string> = {
    verified: "Verified",
    needs_verification: "Needs verification",
    estimated: "Estimated",
  };

  return labels[status];
}

export function getCardsForCategory(slug: string): CardItem[] {
  const maps: Record<string, CardItem[]> = {
    guides: guides.map(guideToCard),
    recipes: recipes.map(entryToCard),
    ingredients: ingredients.map(entryToCard),
    drinks: drinks.map(entryToCard),
    crops: crops.map(entryToCard),
    fish: fish.map(entryToCard),
    fishing: fish.map(entryToCard),
    mining: [
      {
        title: "Mining Basics",
        href: "/guides/mining-basics",
        description: "Gather materials with a clear upgrade plan and avoid cluttering storage.",
        meta: "Guide",
      },
    ],
    crafting: craftingStations.map(entryToCard),
    npcs: [
      {
        title: "Tavern Customers",
        href: "/guides/how-to-get-more-customers",
        description: "Understand how customer growth depends on stock, service flow, and reputation.",
        meta: "Tavern Management",
      },
    ],
  };

  return maps[slug] ?? [];
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getDrink(slug: string): Drink | undefined {
  return drinks.find((drink) => drink.slug === slug);
}

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function getCrop(slug: string): Crop | undefined {
  return crops.find((crop) => crop.slug === slug);
}

export function getFish(slug: string): Fish | undefined {
  return fish.find((item) => item.slug === slug);
}

export function getCraftingStation(slug: string): CraftingStation | undefined {
  return craftingStations.find((station) => station.slug === slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getLatestGuideCards(limit = 6): CardItem[] {
  return guides.slice(0, limit).map(guideToCard);
}

export function getBeginnerGuideCards(): CardItem[] {
  return guides
    .filter((guide) => guide.category === "Beginner Guides")
    .slice(0, 4)
    .map(guideToCard);
}

export function getPopularPages(): CardItem[] {
  return [
    "beginner-tavern-guide",
    "how-to-make-money-early-game",
    "how-to-increase-reputation",
    "best-early-game-recipes",
    "brewing-basics",
    "crafting-stations",
  ]
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => Boolean(guide))
    .map(guideToCard);
}

export function getRelatedGuides(currentPath: string): CardItem[] {
  const currentSlug = currentPath.split("/").filter(Boolean).at(-1);
  const currentGuide = currentSlug ? getGuide(currentSlug) : undefined;
  const related = currentGuide
    ? currentGuide.relatedSlugs
        .map((slug) => getGuide(slug))
        .filter((guide): guide is Guide => Boolean(guide))
    : [];
  const fallback = guides.filter((guide) => `/guides/${guide.slug}` !== currentPath);
  const merged = [...related, ...fallback].filter(
    (guide, index, all) => all.findIndex((item) => item.slug === guide.slug) === index,
  );

  return merged.slice(0, 4).map(guideToCard);
}

export function getGuideNavigation(slug: string): {
  previous?: CardItem;
  next?: CardItem;
} {
  const index = guides.findIndex((guide) => guide.slug === slug);

  return {
    previous: index > 0 ? guideToCard(guides[index - 1]) : undefined,
    next: index >= 0 && index < guides.length - 1 ? guideToCard(guides[index + 1]) : undefined,
  };
}

export function getUsedInRecipes(slug: string): Recipe[] {
  return recipes.filter((recipe) => recipe.ingredientSlugs.includes(slug));
}

export function getUsedInDrinks(slug: string): Drink[] {
  return drinks.filter((drink) => drink.ingredientSlugs.includes(slug));
}

export function getRelatedItems(entry: DatabaseEntry): CardItem[] {
  if (entry.kind === "recipe") {
    const ingredientCards = entry.ingredientSlugs
      .map((slug) => ingredients.find((ingredient) => ingredient.slug === slug))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient))
      .map(entryToCard);
    const station = getCraftingStation(entry.stationSlug);
    return [...ingredientCards, ...(station ? [entryToCard(station)] : [])].slice(0, 8);
  }

  if (entry.kind === "ingredient") {
    const usedRecipes = getUsedInRecipes(entry.slug).map(entryToCard);
    const usedDrinks = getUsedInDrinks(entry.slug).map(entryToCard);
    const relatedCrops = crops.filter((crop) => crop.growsIntoSlug === entry.slug).map(entryToCard);
    return [...usedRecipes, ...usedDrinks, ...relatedCrops].slice(0, 8);
  }

  if (entry.kind === "drink") {
    return entry.ingredientSlugs
      .map((slug) => ingredients.find((ingredient) => ingredient.slug === slug))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient))
      .map(entryToCard)
      .slice(0, 8);
  }

  if (entry.kind === "crop") {
    const growsInto = getIngredient(entry.growsIntoSlug);
    const usedRecipes = getUsedInRecipes(entry.growsIntoSlug).map(entryToCard);
    return [...(growsInto ? [entryToCard(growsInto)] : []), ...usedRecipes].slice(0, 8);
  }

  if (entry.kind === "fish") {
    return entry.usedInRecipeSlugs
      .map((slug) => getRecipe(slug))
      .filter((recipe): recipe is Recipe => Boolean(recipe))
      .map(entryToCard);
  }

  return [...recipes.filter((recipe) => recipe.stationSlug === entry.slug), ...drinks.filter((drink) => drink.stationSlug === entry.slug)]
    .map(entryToCard)
    .slice(0, 8);
}
