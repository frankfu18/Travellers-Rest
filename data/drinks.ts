import type { Drink } from "@/types/content";

const quality = {
  dataStatus: "needs_verification" as const,
  sourceNote: "Needs manual verification",
  lastChecked: "2026-05-27",
  versionNote: "May change after future updates",
};

function drink(input: Omit<Drink, keyof typeof quality | "kind" | "id" | "title" | "keywords" | "sections" | "tips" | "faq">): Drink {
  return {
    ...quality,
    kind: "drink",
    id: `drink-${input.slug}`,
    title: `${input.name} - Travellers Rest Guide`,
    keywords: [`Travellers Rest ${input.name}`, "Travellers Rest drink", `${input.category} drink`],
    sections: [
      {
        id: "brewing-use",
        title: "Brewing Use",
        body: [
          `${input.name} belongs to the ${input.category.toLowerCase()} drink group. Plan it around ingredient availability, brewing station time, and whether aging is worth using for your tavern route.`,
        ],
      },
    ],
    tips: [
      "Protect the ingredient chain before adding this drink to your main tavern menu.",
      "Check the current game version before optimizing around exact value or aging behavior.",
    ],
    faq: [
      {
        question: `How do you make ${input.name} in Travellers Rest?`,
        answer: `Use the ${input.station} with the listed ingredient groups. Exact requirements should be checked in game.`,
      },
      {
        question: `Does ${input.name} use aging?`,
        answer: input.aging,
      },
    ],
    ...input,
  };
}

export const drinks: Drink[] = [
  drink({ slug: "light-beer", name: "Light Beer", description: "A simple beer-style drink for early tavern service.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Grain", "Hops", "Yeast"], ingredientSlugs: ["barley", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "pale-ale", name: "Pale Ale", description: "A beer option for taverns with steady grain and hops supply.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Grain", "Hops", "Yeast"], ingredientSlugs: ["barley", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "dark-ale", name: "Dark Ale", description: "A darker ale-style drink for varied beer menus.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Malt", "Hops", "Yeast"], ingredientSlugs: ["malt", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "wheat-beer", name: "Wheat Beer", description: "A grain-focused beer that can fit wheat farming plans.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Wheat", "Hops", "Yeast"], ingredientSlugs: ["wheat", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "lager", name: "Lager", description: "A clean beer-style drink for a dependable tavern drink list.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Grain", "Hops", "Yeast"], ingredientSlugs: ["barley", "hops", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "stout", name: "Stout", description: "A heavier beer option that can diversify a brewing-focused menu.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Malt", "Grain", "Yeast"], ingredientSlugs: ["malt", "barley", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "porter", name: "Porter", description: "A malt-forward drink for taverns expanding beyond basic beers.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Malt", "Hops", "Yeast"], ingredientSlugs: ["malt", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "honey-ale", name: "Honey Ale", description: "A sweet ale that links bee production with brewing.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Grain", "Honey", "Yeast"], ingredientSlugs: ["barley", "honey", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "apple-cider", name: "Apple Cider", description: "A fruit drink suited to taverns with apple production.", category: "Cider", sellValue: "Needs verification", ingredientGroups: ["Apple", "Yeast"], ingredientSlugs: ["apple", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "pear-cider", name: "Pear Cider", description: "A pear-based cider for orchard-driven drink menus.", category: "Cider", sellValue: "Needs verification", ingredientGroups: ["Pear", "Yeast"], ingredientSlugs: ["pear", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "grape-wine", name: "Grape Wine", description: "A fruit wine option tied to grape production and aging decisions.", category: "Wine", sellValue: "Needs verification", ingredientGroups: ["Grape", "Yeast"], ingredientSlugs: ["grape", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "May benefit from aging; check in game", unlockLevel: "Check in game" }),
  drink({ slug: "berry-wine", name: "Berry Wine", description: "A berry-based wine for fruit-heavy tavern production.", category: "Wine", sellValue: "Needs verification", ingredientGroups: ["Berry", "Yeast"], ingredientSlugs: ["berry", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "May benefit from aging; check in game", unlockLevel: "Check in game" }),
  drink({ slug: "mead", name: "Mead", description: "A honey drink for taverns that can support sweet ingredient production.", category: "Mead", sellValue: "Needs verification", ingredientGroups: ["Honey", "Yeast"], ingredientSlugs: ["honey", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "May benefit from aging; check in game", unlockLevel: "Check in game" }),
  drink({ slug: "herbal-tea", name: "Herbal Tea", description: "A non-beer drink concept for using herbs in service planning.", category: "Tea", sellValue: "Needs verification", ingredientGroups: ["Herb", "Water"], ingredientSlugs: ["herb", "water"], stationSlug: "kitchen", station: "Kitchen", aging: "Not usually an aging target; check in game", unlockLevel: "Check in game" }),
  drink({ slug: "coffee", name: "Coffee", description: "A warm drink entry for tavern menus that support hot beverages.", category: "Hot Drink", sellValue: "Needs verification", ingredientGroups: ["Coffee Ingredient", "Water"], ingredientSlugs: ["water"], stationSlug: "kitchen", station: "Kitchen", aging: "Not usually an aging target; check in game", unlockLevel: "Check in game" }),
  drink({ slug: "fruit-juice", name: "Fruit Juice", description: "A flexible fruit drink for using orchard and berry supply.", category: "Juice", sellValue: "Varies by ingredient", ingredientGroups: ["Any Fruit"], ingredientSlugs: ["apple", "pear", "berry"], stationSlug: "prep-table", station: "Prep Table", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "corn-beer", name: "Corn Beer", description: "A corn-based beer option for crop-diverse brewing plans.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Corn", "Hops", "Yeast"], ingredientSlugs: ["corn", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "rye-ale", name: "Rye Ale", description: "A rye-focused ale for grain variety in brewing routes.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Rye", "Hops", "Yeast"], ingredientSlugs: ["rye", "hops", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "spiced-ale", name: "Spiced Ale", description: "A specialty ale that uses seasoning-style inputs for variety.", category: "Beer", sellValue: "Needs verification", ingredientGroups: ["Grain", "Herb", "Yeast"], ingredientSlugs: ["barley", "herb", "yeast"], stationSlug: "brewing-barrel", station: "Brewing Barrel", aging: "Check in game", unlockLevel: "Check in game" }),
  drink({ slug: "apple-wine", name: "Apple Wine", description: "A fruit wine alternative for apple-heavy orchards.", category: "Wine", sellValue: "Needs verification", ingredientGroups: ["Apple", "Yeast"], ingredientSlugs: ["apple", "yeast"], stationSlug: "fermentation-tank", station: "Fermentation Tank", aging: "May benefit from aging; check in game", unlockLevel: "Check in game" }),
];
