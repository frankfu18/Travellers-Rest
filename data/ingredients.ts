import type { Ingredient } from "@/types/content";

const quality = {
  dataStatus: "needs_verification" as const,
  sourceNote: "Needs manual verification",
  lastChecked: "2026-05-27",
  versionNote: "May change after future updates",
};

function ingredient(input: Omit<Ingredient, keyof typeof quality | "kind" | "id" | "title" | "keywords" | "sections" | "tips" | "faq">): Ingredient {
  return {
    ...quality,
    kind: "ingredient",
    id: `ingredient-${input.slug}`,
    title: `${input.name} - Travellers Rest Guide`,
    keywords: [`Travellers Rest ${input.name}`, "Travellers Rest ingredient", `${input.category} ingredient`],
    sections: [
      {
        id: "ingredient-use",
        title: "How This Ingredient Is Used",
        body: [
          `${input.name} is tracked as a ${input.category.toLowerCase()} ingredient. Use this page to connect its source with recipes, drinks, crops, fish, and tavern production decisions.`,
        ],
      },
    ],
    tips: [
      "Check the current game version before planning a route around exact values.",
      "Use ingredient pages as hubs for recipe and production planning.",
    ],
    faq: [
      {
        question: `How do you get ${input.name} in Travellers Rest?`,
        answer: `${input.name} source: ${input.source}. Exact availability should be checked in game.`,
      },
      {
        question: `What is ${input.name} used for?`,
        answer: "It can be used in cooking, brewing, farming, or crafting chains depending on the item category and recipe requirements.",
      },
    ],
    ...input,
  };
}

export const ingredients: Ingredient[] = [
  ingredient({ slug: "barley", name: "Barley", description: "A grain ingredient commonly associated with brewing and food chains.", category: "Grain", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "wheat", name: "Wheat", description: "A staple grain for flour and baked recipe planning.", category: "Grain", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "rye", name: "Rye", description: "A grain ingredient useful for varied brewing and baking plans.", category: "Grain", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "corn", name: "Corn", description: "A crop ingredient that can support cooking or drink production routes.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "hops", name: "Hops", description: "A brewing ingredient for beer-focused tavern plans.", category: "Brewing", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "yeast", name: "Yeast", description: "A brewing and baking input that supports fermentation-style production.", category: "Processing", source: "Processing or shop source", sourceType: "processing", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "malt", name: "Malt", description: "A processed grain ingredient used in brewing chains.", category: "Brewing", source: "Processing from grain", sourceType: "processing", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "water", name: "Water", description: "A basic input for soups, brewing, and other production chains.", category: "Basic", source: "Check in game", sourceType: "other", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "carrot", name: "Carrot", description: "A flexible vegetable for simple meals and stew-style recipes.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "potato", name: "Potato", description: "A filling vegetable ingredient for roasted and stew-style food.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "onion", name: "Onion", description: "A cooking vegetable often useful as a supporting ingredient.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "tomato", name: "Tomato", description: "A vegetable ingredient for soups, salads, and crop-based dishes.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "lettuce", name: "Lettuce", description: "A leafy ingredient for salads and lighter food options.", category: "Leafy Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "cabbage", name: "Cabbage", description: "A leafy crop ingredient for vegetable-heavy recipes.", category: "Leafy Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "pumpkin", name: "Pumpkin", description: "A hearty crop ingredient for soups and seasonal-style meals.", category: "Vegetable", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "apple", name: "Apple", description: "A fruit ingredient for desserts, cider-style drinks, and orchard planning.", category: "Fruit", source: "Tree harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "pear", name: "Pear", description: "A fruit ingredient for desserts and fruit drink planning.", category: "Fruit", source: "Tree harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "grape", name: "Grape", description: "A fruit ingredient commonly linked with wine production.", category: "Fruit", source: "Crop harvest", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "berry", name: "Berry", description: "A fruit ingredient for pastries, wine, and flexible dessert planning.", category: "Fruit", source: "Crop harvest or foraging", sourceType: "crop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "honey", name: "Honey", description: "A sweet ingredient for mead, desserts, and specialty recipes.", category: "Sweetener", source: "Bee production", sourceType: "animal", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "milk", name: "Milk", description: "An animal product used in dairy and cooking chains.", category: "Animal Product", source: "Animal production", sourceType: "animal", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "egg", name: "Egg", description: "An animal product for simple cooked meals and baking support.", category: "Animal Product", source: "Animal production", sourceType: "animal", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "cheese", name: "Cheese", description: "A processed dairy ingredient for cooked meals and tavern food planning.", category: "Dairy", source: "Processing from milk", sourceType: "processing", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "flour", name: "Flour", description: "A processed grain ingredient required for many baked foods.", category: "Processing", source: "Processing from grain", sourceType: "processing", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "sugar", name: "Sugar", description: "A sweetener used in desserts and some drink planning.", category: "Sweetener", source: "Shop or processing source", sourceType: "shop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "salt", name: "Salt", description: "A seasoning ingredient for savory recipes.", category: "Seasoning", source: "Shop or gathering source", sourceType: "shop", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "meat", name: "Meat", description: "A hearty cooking ingredient for stews and roasted meals.", category: "Meat", source: "Check in game", sourceType: "other", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "chicken", name: "Chicken", description: "A meat ingredient for poultry-focused recipes.", category: "Meat", source: "Check in game", sourceType: "other", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "any-fish", name: "Any Fish", description: "A flexible fish ingredient group used by fish-based recipes.", category: "Fish", source: "Fishing", sourceType: "fish", sellValue: "Varies by ingredient", unlockLevel: "Check in game" }),
  ingredient({ slug: "mushroom", name: "Mushroom", description: "A foraging or cultivation ingredient for soups and savory dishes.", category: "Foraging", source: "Foraging or cultivation", sourceType: "foraging", sellValue: "Needs verification", unlockLevel: "Check in game" }),
  ingredient({ slug: "herb", name: "Herb", description: "A seasoning-style ingredient for fresh recipes and specialty food planning.", category: "Seasoning", source: "Foraging, crop, or shop source", sourceType: "foraging", sellValue: "Needs verification", unlockLevel: "Check in game" }),
];
