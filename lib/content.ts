import { categories } from "@/data/categories";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { cropItems, craftingItems, drinkItems, fishItems, miningItems, npcItems } from "@/data/misc";
import { recipes } from "@/data/recipes";
import type { CardItem, Category, Guide, Ingredient, Recipe } from "@/types/content";

export function getCategory(slug: string): Category {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`Unknown category: ${slug}`);
  }

  return category;
}

export function getCardsForCategory(slug: string): CardItem[] {
  const maps: Record<string, CardItem[]> = {
    guides: guides.map(guideToCard),
    recipes: recipes.map((recipe) => ({
      title: recipe.name,
      href: `/recipes/${recipe.slug}`,
      description: recipe.description,
      meta: `${recipe.craftingStation} - Level ${recipe.unlockLevel}`,
    })),
    ingredients: ingredients.map((ingredient) => ({
      title: ingredient.name,
      href: `/ingredients/${ingredient.slug}`,
      description: ingredient.description,
      meta: ingredient.category,
    })),
    drinks: drinkItems,
    crops: cropItems,
    fishing: fishItems,
    mining: miningItems,
    crafting: craftingItems,
    npcs: npcItems,
  };

  return maps[slug] ?? [];
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideToCard(guide: Guide): CardItem {
  return {
    title: guide.title,
    href: `/guides/${guide.slug}`,
    description: guide.description,
    meta: guide.category,
  };
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
