import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { getCategory, getGuide, guideToCard } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import type { Guide } from "@/types/content";

const category = getCategory("guides");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
  keywords: category.keywords,
});

const guideGroups = [
  {
    title: "Beginner",
    description: "Start here if you are still building a stable tavern routine.",
    slugs: ["beginner-tavern-guide", "what-to-do-first-week"],
  },
  {
    title: "Money",
    description: "Use these guides to connect stock, upgrades, and service flow to better income.",
    slugs: ["how-to-make-money-early-game", "best-early-game-upgrades"],
  },
  {
    title: "Recipes",
    description: "Plan early food around ingredients you can replace consistently.",
    slugs: ["best-early-game-recipes", "food-vs-drinks-early-game"],
  },
  {
    title: "Drinks & Brewing",
    description: "Keep the bar stocked and avoid brewing bottlenecks.",
    slugs: ["brewing-basics", "food-vs-drinks-early-game"],
  },
  {
    title: "Farming",
    description: "Turn fields into a reliable ingredient supply chain.",
    slugs: ["farming-basics", "how-to-avoid-stock-shortages"],
  },
  {
    title: "Fishing",
    description: "Use fishing as menu support instead of random storage filler.",
    slugs: ["fishing-basics"],
  },
  {
    title: "Crafting",
    description: "Choose stations and mining goals that solve real tavern bottlenecks.",
    slugs: ["crafting-stations", "mining-basics", "best-early-game-upgrades"],
  },
  {
    title: "Tavern Management",
    description: "Improve customer flow, reputation, layout, and stock reliability.",
    slugs: ["how-to-increase-reputation", "how-to-get-more-customers", "how-to-avoid-stock-shortages", "tavern-layout-tips"],
  },
];

export default function GuidesPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <Breadcrumbs items={[{ name: category.name, href: category.href }]} />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Travellers Rest guides</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="space-y-10">
          {guideGroups.map((group) => {
            const items = group.slugs
              .map((slug) => getGuide(slug))
              .filter((guide): guide is Guide => Boolean(guide))
              .map(guideToCard);

            return (
              <section key={group.title} aria-labelledby={`${group.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}-heading`}>
                <div className="mb-4 border-b border-amber-200/15 pb-4">
                  <h2 id={`${group.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}-heading`} className="text-2xl font-bold text-amber-50">
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-stone-400">{group.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <ContentCard key={item.href} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
