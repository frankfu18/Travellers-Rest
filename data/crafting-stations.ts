import type { CraftingStation } from "@/types/content";

const quality = {
  dataStatus: "needs_verification" as const,
  sourceNote: "Needs manual verification",
  lastChecked: "2026-05-27",
  versionNote: "May change after future updates",
};

function station(slug: string, name: string, stationType: string, usedFor: string[]): CraftingStation {
  return {
    ...quality,
    kind: "station",
    id: `station-${slug}`,
    slug,
    title: `${name} - Travellers Rest Guide`,
    name,
    description: `${name} is a crafting station used for ${usedFor.join(", ").toLowerCase()} planning in Travellers Rest.`,
    category: stationType,
    keywords: [`Travellers Rest ${name}`, "Travellers Rest crafting station", "Travellers Rest crafting"],
    sections: [
      {
        id: "station-use",
        title: "Station Use",
        body: [
          `${name} matters when it solves a production bottleneck. Build around the recipes, drinks, or materials your tavern can already support.`,
        ],
      },
    ],
    tips: ["Prioritize stations that solve current bottlenecks.", "Check exact unlock and upgrade requirements in game."],
    faq: [
      { question: `What is ${name} used for?`, answer: `${name} is used for ${usedFor.join(", ").toLowerCase()}.` },
      { question: `When should I prioritize ${name}?`, answer: "Prioritize it when its output supports your current tavern menu or production chain." },
    ],
    stationType,
    usedFor,
    unlockLevel: "Check in game",
  };
}

export const craftingStations: CraftingStation[] = [
  station("kitchen", "Kitchen", "Cooking", ["Cooking recipes", "hot food service"]),
  station("oven", "Oven", "Baking", ["Baked recipes", "desserts"]),
  station("prep-table", "Prep Table", "Preparation", ["salads", "cold preparation"]),
  station("brewing-barrel", "Brewing Barrel", "Brewing", ["beer", "ale production"]),
  station("fermentation-tank", "Fermentation Tank", "Brewing", ["wine", "cider", "mead"]),
  station("aging-barrel", "Aging Barrel", "Aging", ["aging drinks", "value planning"]),
  station("keg", "Keg", "Serving", ["drink storage", "tavern service"]),
  station("mill", "Mill", "Processing", ["grain processing", "flour production"]),
  station("workbench", "Workbench", "Crafting", ["crafting upgrades", "station support"]),
  station("distillery", "Distillery", "Brewing", ["spirits", "advanced drink planning"]),
];
