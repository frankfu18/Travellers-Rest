export type VerificationTarget = {
  type: "recipe" | "drink" | "ingredient";
  slug: string;
  name: string;
  checklist: {
    name: "confirmed" | "unknown";
    category: "confirmed" | "unknown";
    description: "confirmed" | "unknown";
    relatedRecipesOrDrinks: "confirm";
    relatedIngredients: "confirm";
    stationIfApplicable: "confirm" | "not_applicable";
    sourceHowToObtain: "confirm";
    unlockNote: "unknown";
    sellValue: "unknown";
    versionNote: "confirm_current_version";
  };
};

const defaultChecklist: VerificationTarget["checklist"] = {
  name: "confirmed",
  category: "confirmed",
  description: "confirmed",
  relatedRecipesOrDrinks: "confirm",
  relatedIngredients: "confirm",
  stationIfApplicable: "confirm",
  sourceHowToObtain: "confirm",
  unlockNote: "unknown",
  sellValue: "unknown",
  versionNote: "confirm_current_version",
};

const ingredientChecklist: VerificationTarget["checklist"] = {
  ...defaultChecklist,
  stationIfApplicable: "not_applicable",
};

export const verificationTargets: VerificationTarget[] = [
  { type: "recipe", slug: "bread", name: "Bread", checklist: defaultChecklist },
  { type: "recipe", slug: "roast-fish", name: "Roast Fish", checklist: defaultChecklist },
  { type: "recipe", slug: "vegetable-stew", name: "Vegetable Stew", checklist: defaultChecklist },
  { type: "recipe", slug: "roasted-potato", name: "Roasted Potato", checklist: defaultChecklist },
  { type: "recipe", slug: "fried-egg", name: "Fried Egg", checklist: defaultChecklist },
  { type: "drink", slug: "light-beer", name: "Light Beer", checklist: defaultChecklist },
  { type: "drink", slug: "lager", name: "Lager", checklist: defaultChecklist },
  { type: "drink", slug: "apple-cider", name: "Apple Cider", checklist: defaultChecklist },
  { type: "drink", slug: "mead", name: "Mead", checklist: defaultChecklist },
  { type: "drink", slug: "herbal-tea", name: "Herbal Tea", checklist: defaultChecklist },
  { type: "ingredient", slug: "wheat", name: "Wheat", checklist: ingredientChecklist },
  { type: "ingredient", slug: "barley", name: "Barley", checklist: ingredientChecklist },
  { type: "ingredient", slug: "hops", name: "Hops", checklist: ingredientChecklist },
  { type: "ingredient", slug: "apple", name: "Apple", checklist: ingredientChecklist },
  { type: "ingredient", slug: "potato", name: "Potato", checklist: ingredientChecklist },
  { type: "ingredient", slug: "carrot", name: "Carrot", checklist: ingredientChecklist },
  { type: "ingredient", slug: "egg", name: "Egg", checklist: ingredientChecklist },
  { type: "ingredient", slug: "milk", name: "Milk", checklist: ingredientChecklist },
  { type: "ingredient", slug: "any-fish", name: "Any Fish", checklist: ingredientChecklist },
  { type: "ingredient", slug: "yeast", name: "Yeast", checklist: ingredientChecklist },
];
