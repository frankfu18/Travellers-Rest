import type { Ingredient } from "@/types/content";

export const ingredients: Ingredient[] = [
  {
    id: "ingredient-barley",
    slug: "barley",
    title: "Travellers Rest Barley Ingredient Guide",
    name: "Barley",
    description: "A core grain for brewing and cooking chains, especially useful for beer-focused taverns.",
    category: "Crop",
    keywords: ["Travellers Rest Barley", "Travellers Rest brewing ingredient", "grain crop"],
    sections: [
      {
        id: "ingredient-overview",
        title: "Ingredient Overview",
        body: [
          "Barley is a starter ingredient record for crop and brewing content. It should eventually link to every recipe and drink chain that uses it.",
        ],
      },
    ],
    sellPrice: 8,
    ingredients: [],
    craftingStation: "Field",
    unlockLevel: 1,
    source: "Farm crop",
    faq: [
      {
        question: "Why is Barley important?",
        answer: "Barley supports brewing progression and helps keep drink production consistent.",
      },
      {
        question: "Should beginners stockpile Barley?",
        answer: "Yes. A small reserve makes brewing less fragile when demand increases.",
      },
    ],
  },
  {
    id: "ingredient-carrot",
    slug: "carrot",
    title: "Travellers Rest Carrot Ingredient Guide",
    name: "Carrot",
    description: "A flexible crop ingredient for simple cooking recipes and early tavern meals.",
    category: "Crop",
    keywords: ["Travellers Rest Carrot", "Travellers Rest crop ingredient", "early cooking"],
    sections: [
      {
        id: "ingredient-overview",
        title: "Ingredient Overview",
        body: [
          "Carrot is a flexible mock crop entry for early cooking content. It is useful for explaining how ingredient pages can support recipe hubs.",
        ],
      },
    ],
    sellPrice: 6,
    ingredients: [],
    craftingStation: "Field",
    unlockLevel: 1,
    source: "Farm crop",
    faq: [
      {
        question: "What recipes use Carrot?",
        answer: "Carrot is commonly suited to soup and stew style recipes in this starter dataset.",
      },
      {
        question: "Is Carrot worth growing?",
        answer: "It is useful as a low-friction ingredient when building a simple kitchen supply chain.",
      },
    ],
  },
  {
    id: "ingredient-honey",
    slug: "honey",
    title: "Travellers Rest Honey Ingredient Guide",
    name: "Honey",
    description: "A sweet ingredient for desserts and specialty drinks.",
    category: "Animal Product",
    keywords: ["Travellers Rest Honey", "Travellers Rest sweet ingredient", "dessert drinks"],
    sections: [
      {
        id: "ingredient-overview",
        title: "Ingredient Overview",
        body: [
          "Honey is a higher-value ingredient entry for sweet recipes and specialty drink planning. It gives the data model a non-crop example.",
        ],
      },
    ],
    sellPrice: 18,
    ingredients: [],
    craftingStation: "Apiary",
    unlockLevel: 4,
    source: "Bee production",
    faq: [
      {
        question: "What is Honey best for?",
        answer: "Honey is best saved for recipes and drinks where its higher value can improve menu returns.",
      },
      {
        question: "When should I unlock Honey production?",
        answer: "After your basic crop and kitchen loops are stable.",
      },
    ],
  },
];
