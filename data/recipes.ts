import type { Recipe } from "@/types/content";

export const recipes: Recipe[] = [
  {
    id: "recipe-roast-fish",
    slug: "roast-fish",
    title: "Travellers Rest Roast Fish Recipe",
    name: "Roast Fish",
    description: "A simple early-game cooked fish dish that turns basic catches into reliable tavern food.",
    category: "Cooking",
    keywords: ["Travellers Rest Roast Fish", "Travellers Rest fish recipe", "early game recipes"],
    sections: [
      {
        id: "recipe-overview",
        title: "Recipe Overview",
        body: [
          "Roast Fish is a simple mock recipe entry for players who want to turn fishing time into tavern food. Keep this kind of recipe page focused on ingredients, station requirements, and practical use cases.",
        ],
      },
    ],
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
    title: "Travellers Rest Vegetable Stew Recipe",
    name: "Vegetable Stew",
    description: "A cozy tavern staple made from farm crops and a kitchen station.",
    category: "Cooking",
    keywords: ["Travellers Rest Vegetable Stew", "Travellers Rest cooking", "crop recipes"],
    sections: [
      {
        id: "recipe-overview",
        title: "Recipe Overview",
        body: [
          "Vegetable Stew is a crop-driven mock recipe for building a predictable kitchen loop. It works well as an example page because it connects farming, cooking, and menu planning.",
        ],
      },
    ],
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
    title: "Travellers Rest Apple Pie Recipe",
    name: "Apple Pie",
    description: "A higher-value dessert-style recipe for players expanding beyond basic tavern meals.",
    category: "Dessert",
    keywords: ["Travellers Rest Apple Pie", "Travellers Rest dessert", "oven recipes"],
    sections: [
      {
        id: "recipe-overview",
        title: "Recipe Overview",
        body: [
          "Apple Pie is a mock dessert recipe that shows how a detail page can explain ingredients, station planning, and why a prepared food belongs in a tavern menu.",
        ],
      },
    ],
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
