import type { Crop } from "@/types/content";

const quality = {
  dataStatus: "needs_verification" as const,
  sourceNote: "Needs manual verification",
  lastChecked: "2026-05-27",
  versionNote: "May change after future updates",
};

function crop(slug: string, name: string, growsIntoSlug: string, growsInto: string, category = "Crop"): Crop {
  return {
    ...quality,
    kind: "crop",
    id: `crop-${slug}`,
    slug,
    title: `${name} - Travellers Rest Guide`,
    name,
    description: `${name} is a farming entry used to plan ingredient supply for recipes, drinks, and tavern production.`,
    category,
    keywords: [`Travellers Rest ${name}`, "Travellers Rest crops", "Travellers Rest farming"],
    sections: [
      {
        id: "crop-planning",
        title: "Crop Planning",
        body: [
          `${name} should be grown when ${growsInto} supports your current cooking, brewing, or ingredient plan. Confirm season and harvest details in game before planning a strict route.`,
        ],
      },
    ],
    tips: ["Grow crops that support your current menu before expanding into variety.", "Keep a reserve of important ingredients for service days."],
    faq: [
      { question: `What does ${name} produce?`, answer: `${name} grows into ${growsInto}.` },
      { question: `When should I grow ${name}?`, answer: "Grow it when the related ingredient supports your active recipes or drinks." },
    ],
    seed: `${name} Seed`,
    season: "Check in game",
    harvest: "Check in game",
    growsIntoSlug,
    growsInto,
  };
}

export const crops: Crop[] = [
  crop("barley", "Barley", "barley", "Barley", "Grain"),
  crop("wheat", "Wheat", "wheat", "Wheat", "Grain"),
  crop("rye", "Rye", "rye", "Rye", "Grain"),
  crop("corn", "Corn", "corn", "Corn", "Vegetable"),
  crop("hops", "Hops", "hops", "Hops", "Brewing"),
  crop("carrot", "Carrot", "carrot", "Carrot", "Vegetable"),
  crop("potato", "Potato", "potato", "Potato", "Vegetable"),
  crop("onion", "Onion", "onion", "Onion", "Vegetable"),
  crop("tomato", "Tomato", "tomato", "Tomato", "Vegetable"),
  crop("lettuce", "Lettuce", "lettuce", "Lettuce", "Leafy Vegetable"),
  crop("cabbage", "Cabbage", "cabbage", "Cabbage", "Leafy Vegetable"),
  crop("pumpkin", "Pumpkin", "pumpkin", "Pumpkin", "Vegetable"),
  crop("apple-tree", "Apple Tree", "apple", "Apple", "Tree"),
  crop("pear-tree", "Pear Tree", "pear", "Pear", "Tree"),
  crop("grapevine", "Grapevine", "grape", "Grape", "Fruit"),
  crop("berry-bush", "Berry Bush", "berry", "Berry", "Fruit"),
  crop("strawberry", "Strawberry", "berry", "Berry", "Fruit"),
  crop("blueberry", "Blueberry", "berry", "Berry", "Fruit"),
  crop("garlic", "Garlic", "herb", "Herb", "Seasoning"),
  crop("mushroom-bed", "Mushroom Bed", "mushroom", "Mushroom", "Foraging"),
];
