import { guides as baseGuides } from "@/data/guides";
import { strategyGuides } from "@/data/strategy-guides";

const strategySlugs = new Set(strategyGuides.map((guide) => guide.slug));

export const guides = [...strategyGuides, ...baseGuides.filter((guide) => !strategySlugs.has(guide.slug))];
