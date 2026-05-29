import type { ToolEntry } from "@/types/content";

const quality = {
  dataStatus: "completed" as const,
  sourceNote: "Site utility page maintained by Travellers Rest Guide",
  lastChecked: "2026-05-29",
  versionNote: "Tool logic uses user-provided values and does not depend on fixed game prices",
};

export const tools: ToolEntry[] = [
  {
    slug: "profit-calculator",
    title: "Profit Calculator",
    href: "/tools/profit-calculator",
    description: "Estimate profit and profit margin from manual sell price and ingredient cost inputs.",
    category: "Tools",
    keywords: ["profit calculator", "make money", "profit margin", "tools"],
    ...quality,
  },
  {
    slug: "brewing-guide",
    title: "Brewing Guide",
    href: "/tools/brewing-guide",
    description: "Plan brewing steps, drink categories, related drinks, and brewing station decisions.",
    category: "Tools",
    keywords: ["brewing", "beer", "drinks", "brewing guide"],
    ...quality,
  },
  {
    slug: "aging-guide",
    title: "Aging Guide",
    href: "/tools/aging-guide",
    description: "Understand aging decisions for drinks and related tavern products.",
    category: "Tools",
    keywords: ["aging", "aged drinks", "aging guide", "tools"],
    ...quality,
  },
];
