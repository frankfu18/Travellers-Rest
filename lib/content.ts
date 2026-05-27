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
    completed: "Completed",
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

export function getGuideDatabaseLinks(slug: string): CardItem[] {
  const bySlug: Record<string, string[]> = {
    "beginner-tavern-guide": ["/recipes", "/drinks", "/ingredients/barley", "/crops/carrot"],
    "how-to-make-money-early-game": ["/tools/profit-calculator", "/recipes/roast-fish", "/recipes/vegetable-stew", "/drinks/light-beer"],
    "how-to-increase-reputation": ["/recipes", "/drinks", "/crafting/kitchen", "/ingredients"],
    "how-to-get-more-customers": ["/drinks/light-beer", "/recipes/vegetable-stew", "/crafting/dining-table", "/recipes"],
    "brewing-basics": ["/drinks", "/drinks/light-beer", "/ingredients/barley", "/ingredients/hops"],
    "farming-basics": ["/crops", "/crops/carrot", "/ingredients/carrot", "/recipes/vegetable-stew"],
    "fishing-basics": ["/fish", "/fish/river-fish", "/ingredients/any-fish", "/recipes/roast-fish"],
    "mining-basics": ["/crafting", "/crafting/forge", "/crafting/workbench", "/tools/profit-calculator"],
    "crafting-stations": ["/crafting", "/crafting/kitchen", "/crafting/brewing-barrel", "/recipes"],
    "best-early-game-recipes": ["/recipes", "/recipes/roast-fish", "/recipes/vegetable-stew", "/ingredients"],
  };

  const cards: Record<string, CardItem> = {
    "/recipes": {
      title: "Recipes Database",
      href: "/recipes",
      description: "Browse recipe pages and compare ingredients, stations, and related items.",
      meta: "Recipes",
    },
    "/drinks": {
      title: "Drinks Database",
      href: "/drinks",
      description: "Browse beer, cider, wine, and other drink entries for tavern service planning.",
      meta: "Drinks",
    },
    "/ingredients": {
      title: "Ingredients Database",
      href: "/ingredients",
      description: "Find crop, fish, brewing, animal, and shop ingredients used across recipes and drinks.",
      meta: "Ingredients",
    },
    "/crops": {
      title: "Crops Database",
      href: "/crops",
      description: "Browse crop entries and connect harvest planning to cooking and brewing routes.",
      meta: "Crops",
    },
    "/fish": {
      title: "Fish Database",
      href: "/fish",
      description: "Browse fish entries and connect catches to recipe planning.",
      meta: "Fish",
    },
    "/crafting": {
      title: "Crafting Stations Database",
      href: "/crafting",
      description: "Browse stations used for cooking, brewing, processing, storage, and production planning.",
      meta: "Crafting",
    },
    "/tools/profit-calculator": {
      title: "Profit Calculator",
      href: "/tools/profit-calculator",
      description: "Estimate profit and margin from an item's sell price and ingredient cost.",
      meta: "Tool",
    },
  };

  const entryCards = [...recipes, ...drinks, ...ingredients, ...crops, ...fish, ...craftingStations].reduce<Record<string, CardItem>>((acc, item) => {
    acc[getEntryPath(item)] = {
      title: item.name,
      href: getEntryPath(item),
      description: item.description,
      meta: item.category,
    };
    return acc;
  }, {});

  return (bySlug[slug] ?? ["/recipes", "/drinks", "/ingredients", "/crafting"])
    .map((href) => cards[href] ?? entryCards[href])
    .filter((item): item is CardItem => Boolean(item));
}

export function getGuideMistakes(slug: string): string[] {
  const mistakes: Record<string, string[]> = {
    "beginner-tavern-guide": [
      "Opening before food, drinks, and cleaning are ready, then spending the whole service reacting to shortages.",
      "Unlocking new systems faster than the tavern can supply them, which makes the day feel busy without improving income.",
      "Ignoring small layout friction because it looks harmless; repeated walking and cleaning problems add up over many service days.",
    ],
    "how-to-make-money-early-game": [
      "Chasing one theoretical best item while the tavern runs out of dependable stock.",
      "Selling or consuming ingredients before deciding which recipe or drink chain needs them most.",
      "Buying upgrades that look exciting but do not solve the bottleneck limiting today's income.",
    ],
    "how-to-increase-reputation": [
      "Trying to force reputation growth with expansion while service quality, stock, and cleanliness are still inconsistent.",
      "Treating reputation as a separate grind instead of the result of many reliable service days.",
      "Adding more seats or menu variety before the tavern can serve the customers it already has.",
    ],
    "how-to-get-more-customers": [
      "Pushing customer traffic before the menu, drinks, seating, and cleaning routine can absorb the extra demand.",
      "Adding capacity without checking whether production stations and ingredient supply can keep up.",
      "Confusing a bigger room with a smoother room; customers are easier to serve when paths and work zones stay readable.",
    ],
    "brewing-basics": [
      "Starting too many drink chains at once and draining ingredients that the kitchen or farm plan also needs.",
      "Waiting until service starts to notice that drinks are unfinished, unstocked, or blocked behind station time.",
      "Judging brewing only by product value instead of ingredient reliability, station capacity, and service timing.",
    ],
    "farming-basics": [
      "Growing a wide mix of crops without connecting them to the recipes and drinks actually served in the tavern.",
      "Letting storage fill with unused harvests while key menu ingredients run short.",
      "Changing the farm plan based on guesses instead of reviewing what sold, what ran out, and what stayed unused.",
    ],
    "fishing-basics": [
      "Fishing for most of the day when the tavern still needs preparation, cleaning, farming, or brewing attention.",
      "Keeping catches in storage instead of turning reliable fish supply into practical menu value.",
      "Building a core food plan around fish you cannot catch consistently in your current routine.",
    ],
    "mining-basics": [
      "Mining without a station, upgrade, or material goal, then returning with clutter instead of progress.",
      "Leaving the tavern understocked for a mining trip and losing service quality afterward.",
      "Gathering materials before identifying whether the real bottleneck is equipment, ingredients, layout, or service timing.",
    ],
    "crafting-stations": [
      "Building several new stations at once before the farm, storage, and service routine can support the new chains.",
      "Choosing stations because they are new rather than because they remove a bottleneck from the current tavern loop.",
      "Forgetting that stations still need ingredients and time; idle equipment is not progress by itself.",
    ],
    "best-early-game-recipes": [
      "Choosing recipes only by expected value while ignoring whether the ingredients can be replaced consistently.",
      "Adding too many menu items before a small core menu can stay stocked through normal service.",
      "Using key brewing, farming, or animal ingredients in recipes without checking what other products depend on them.",
    ],
  };

  return mistakes[slug] ?? [
    "Expanding the tavern loop before the supply chain is stable.",
    "Treating new unlocks as mandatory instead of matching them to current bottlenecks.",
    "Ignoring what each service day reveals about stock, layout, and customer flow.",
  ];
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
