export type ContentKind = "recipe" | "ingredient" | "drink" | "crop" | "guide";

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  sections: GuideSection[];
  sellPrice: number;
  ingredients: string[];
  craftingStation: string;
  unlockLevel: number;
  prepTime: string;
  faq: FaqItem[];
};

export type Ingredient = {
  id: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  sections: GuideSection[];
  sellPrice: number;
  ingredients: string[];
  craftingStation: string;
  unlockLevel: number;
  source: string;
  faq: FaqItem[];
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

export type GuideSection = {
  id: string;
  title: string;
  body: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
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
