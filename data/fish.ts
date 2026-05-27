import type { Fish } from "@/types/content";

const quality = {
  dataStatus: "needs_verification" as const,
  sourceNote: "Needs manual verification",
  lastChecked: "2026-05-27",
  versionNote: "May change after future updates",
};

function fishEntry(slug: string, name: string, location = "Check in game"): Fish {
  return {
    ...quality,
    kind: "fish",
    id: `fish-${slug}`,
    slug,
    title: `${name} - Travellers Rest Guide`,
    name,
    description: `${name} is a fish entry for recipe planning, fishing trips, and early tavern food supply.`,
    category: "Fish",
    keywords: [`Travellers Rest ${name}`, "Travellers Rest fish", "Travellers Rest fishing"],
    sections: [
      {
        id: "fishing-use",
        title: "Fishing Use",
        body: [
          `${name} can support fish-based recipes when you can catch it consistently. Check in game for location, bait, and availability before building a route around it.`,
        ],
      },
    ],
    tips: ["Use fish in recipes when it supports your menu.", "Avoid relying on a fish until its source is easy for your route to repeat."],
    faq: [
      { question: `Where do you catch ${name}?`, answer: location },
      { question: `What is ${name} used for?`, answer: "Use it as a fish ingredient for related recipes when the recipe accepts fish." },
    ],
    location,
    bait: "Check in game",
    usedInRecipeSlugs: ["roast-fish", "fish-pie"],
  };
}

export const fish: Fish[] = [
  fishEntry("river-fish", "River Fish", "River or freshwater areas; check in game"),
  fishEntry("lake-fish", "Lake Fish", "Lake areas; check in game"),
  fishEntry("trout", "Trout"),
  fishEntry("salmon", "Salmon"),
  fishEntry("carp", "Carp"),
  fishEntry("perch", "Perch"),
  fishEntry("eel", "Eel"),
  fishEntry("sardine", "Sardine"),
  fishEntry("cod", "Cod"),
  fishEntry("tuna", "Tuna"),
  fishEntry("catfish", "Catfish"),
  fishEntry("pike", "Pike"),
  fishEntry("bass", "Bass"),
  fishEntry("anchovy", "Anchovy"),
  fishEntry("squid", "Squid"),
];
