export type ContentKind = "recipe" | "ingredient" | "drink" | "crop" | "fish" | "station" | "guide";

export type DataStatus = "verified" | "completed" | "needs_verification";

export type DataQuality = {
  dataStatus: DataStatus;
  sourceNote: string;
  lastChecked: string;
  versionNote: string;
};

export type GuideSection = {
  id: string;
  title: string;
  body: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type DatabaseEntryBase = DataQuality & {
  id: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  sections: GuideSection[];
  tips: string[];
  faq: FaqItem[];
};

export type Recipe = DatabaseEntryBase & {
  kind: "recipe";
  sellValue: string;
  ingredientGroups: string[];
  ingredientSlugs: string[];
  stationSlug: string;
  station: string;
  unlockLevel: string;
  prepTime: string;
};

export type Ingredient = DatabaseEntryBase & {
  kind: "ingredient";
  source: string;
  sourceType: "crop" | "fish" | "animal" | "shop" | "processing" | "foraging" | "brewing" | "other";
  sellValue: string;
  unlockLevel: string;
};

export type Drink = DatabaseEntryBase & {
  kind: "drink";
  sellValue: string;
  ingredientGroups: string[];
  ingredientSlugs: string[];
  stationSlug: string;
  station: string;
  aging: string;
  unlockLevel: string;
};

export type Crop = DatabaseEntryBase & {
  kind: "crop";
  seed: string;
  season: string;
  harvest: string;
  growsIntoSlug: string;
  growsInto: string;
};

export type Fish = DatabaseEntryBase & {
  kind: "fish";
  location: string;
  bait: string;
  usedInRecipeSlugs: string[];
};

export type CraftingStation = DatabaseEntryBase & {
  kind: "station";
  stationType: string;
  usedFor: string[];
  unlockLevel: string;
};

export type DatabaseEntry = Recipe | Ingredient | Drink | Crop | Fish | CraftingStation;

export type ToolEntry = DataQuality & {
  slug: string;
  title: string;
  href: string;
  description: string;
  category: "Tools";
  keywords: string[];
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  updatedAt: string;
  readingTime: string;
  sections: GuideSection[];
  faq: FaqItem[];
  relatedSlugs: string[];
};

export type Category = {
  slug: string;
  href: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
};

export type CardItem = {
  title: string;
  href: string;
  description: string;
  meta?: string;
};
