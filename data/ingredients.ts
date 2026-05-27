import type { Ingredient } from "@/types/content";

export const ingredients: Ingredient[] = [
  {
    id: "ingredient-barley",
    slug: "barley",
    name: "Barley",
    description: "A core grain for brewing and cooking chains, especially useful for beer-focused taverns.",
    category: "Crop",
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
    name: "Carrot",
    description: "A flexible crop ingredient for simple cooking recipes and early tavern meals.",
    category: "Crop",
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
    name: "Honey",
    description: "A sweet ingredient for desserts and specialty drinks.",
    category: "Animal Product",
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
