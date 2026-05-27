import type { CardItem } from "@/types/content";

export const drinkItems: CardItem[] = [
  {
    title: "Light Beer",
    href: "/drinks#light-beer",
    description: "A starter drink entry for beer-focused tavern menus.",
    meta: "Brewing",
  },
  {
    title: "Honey Ale",
    href: "/drinks#honey-ale",
    description: "A sweet specialty drink concept for mid-game production planning.",
    meta: "Brewing",
  },
];

export const cropItems: CardItem[] = [
  {
    title: "Barley",
    href: "/ingredients/barley",
    description: "A grain crop used heavily in brewing and production chains.",
    meta: "Crop",
  },
  {
    title: "Carrot",
    href: "/ingredients/carrot",
    description: "A flexible early crop for simple tavern meals.",
    meta: "Crop",
  },
];

export const fishItems: CardItem[] = [
  {
    title: "River Fish",
    href: "/fishing#river-fish",
    description: "Placeholder fish entry for location, bait, and recipe use data.",
    meta: "Fishing",
  },
  {
    title: "Roast Fish",
    href: "/recipes/roast-fish",
    description: "Turn early catches into a dependable cooked menu item.",
    meta: "Recipe",
  },
];

export const miningItems: CardItem[] = [
  {
    title: "Iron Ore",
    href: "/mining#iron-ore",
    description: "Placeholder ore entry for crafting and station upgrade chains.",
    meta: "Ore",
  },
  {
    title: "Coal",
    href: "/mining#coal",
    description: "Fuel and crafting material reference for production planning.",
    meta: "Fuel",
  },
];

export const craftingItems: CardItem[] = [
  {
    title: "Kitchen",
    href: "/crafting#kitchen",
    description: "Core station for cooking recipes and food service.",
    meta: "Station",
  },
  {
    title: "Oven",
    href: "/crafting#oven",
    description: "Baking station used for pies and other prepared foods.",
    meta: "Station",
  },
];

export const npcItems: CardItem[] = [
  {
    title: "Vendor NPCs",
    href: "/npcs#vendors",
    description: "Placeholder reference for shopkeepers, services, and vendor schedules.",
    meta: "NPCs",
  },
  {
    title: "Tavern Customers",
    href: "/npcs#customers",
    description: "Customer behavior notes for service quality and reputation.",
    meta: "Reputation",
  },
];
