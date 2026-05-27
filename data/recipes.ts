import type { Recipe } from "@/types/content";

export const recipes: Recipe[] = [
  {
    id: "recipe-roast-fish",
    slug: "roast-fish",
    name: "Roast Fish",
    description: "A simple early-game cooked fish dish that turns basic catches into reliable tavern food.",
    category: "Cooking",
    sellPrice: 34,
    ingredients: ["Any Fish", "Salt"],
    craftingStation: "Kitchen",
    unlockLevel: 2,
    prepTime: "Short",
    faq: [
      {
        question: "Is Roast Fish good for beginners?",
        answer: "Yes. It is useful when you have steady fishing income and need a simple food item for the tavern menu.",
      },
      {
        question: "Can any fish be used?",
        answer: "This mock entry treats the fish slot as flexible. Confirm exact in-game requirements when replacing mock data.",
      },
    ],
  },
  {
    id: "recipe-vegetable-stew",
    slug: "vegetable-stew",
    name: "Vegetable Stew",
    description: "A cozy tavern staple made from farm crops and a kitchen station.",
    category: "Cooking",
    sellPrice: 42,
    ingredients: ["Carrot", "Onion", "Water"],
    craftingStation: "Kitchen",
    unlockLevel: 3,
    prepTime: "Medium",
    faq: [
      {
        question: "What is Vegetable Stew used for?",
        answer: "It is a practical menu filler for crop-heavy production plans.",
      },
      {
        question: "Should I grow ingredients for stew early?",
        answer: "Yes, if your tavern has consistent food demand and you want predictable kitchen output.",
      },
    ],
  },
  {
    id: "recipe-apple-pie",
    slug: "apple-pie",
    name: "Apple Pie",
    description: "A higher-value dessert-style recipe for players expanding beyond basic tavern meals.",
    category: "Dessert",
    sellPrice: 58,
    ingredients: ["Apple", "Flour", "Sugar"],
    craftingStation: "Oven",
    unlockLevel: 5,
    prepTime: "Medium",
    faq: [
      {
        question: "Is Apple Pie a good profit recipe?",
        answer: "It can be, especially once the ingredient supply chain is stable.",
      },
      {
        question: "Which station makes Apple Pie?",
        answer: "This mock entry uses the Oven as the crafting station.",
      },
    ],
  },
];
