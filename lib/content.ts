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
    guides: guides.map((guide) => ({
      title: guide.title,
      href: `/guides/${guide.slug}`,
      description: guide.description,
      meta: guide.category,
    })),
    recipes: recipes.map((recipe) => ({
      title: recipe.name,
      href: `/recipes/${recipe.slug}`,
      description: recipe.description,
      meta: `${recipe.craftingStation} · Level ${recipe.unlockLevel}`,
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

export function getPopularPages(): CardItem[] {
  return [
    {
      title: "Beginner Tavern Guide",
      href: "/guides/beginner-tavern-guide",
      description: "Start with the right daily loop for service, food, drinks, and reputation.",
      meta: "Beginner",
    },
    {
      title: "Roast Fish",
      href: "/recipes/roast-fish",
      description: "A practical early cooked dish for fishing-heavy starts.",
      meta: "Recipe",
    },
    {
      title: "Barley",
      href: "/ingredients/barley",
      description: "A core crop for brewing and tavern production chains.",
      meta: "Ingredient",
    },
  ];
}

export function getRelatedGuides(currentPath: string): CardItem[] {
  return getPopularPages().filter((item) => item.href !== currentPath).slice(0, 3);
}
