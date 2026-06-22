import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { JsonLd } from "@/components/json-ld";
import { SearchBox } from "@/components/search-box";
import { categories } from "@/data/categories";
import { createMetadata } from "@/lib/seo";
import { getGuide, getPopularPages, guideToCard } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Tavern Planner & Strategy Guide",
  description:
    "Plan your tavern, choose what to cook, manage ingredients, prepare for trends, and decide what to do next in Travellers Rest.",
  path: "/",
  keywords: [
    "Travellers Rest planner",
    "Travellers Rest strategy guide",
    "Travellers Rest menu planner",
    "Travellers Rest what to do next",
  ],
});

const primaryActions = [
  {
    title: "What to Do Next",
    href: "/what-to-do-next",
    description: "Pick your stage, bottleneck, and unlocked systems to get a practical next-step route.",
    meta: "Decision tool",
  },
  {
    title: "Menu Planner",
    href: "/menu-planner",
    description: "Choose food, drink, stockpile, and variety priorities around your current goal.",
    meta: "Planning tool",
  },
  {
    title: "Tavern Progression Guide",
    href: "/progression",
    description: "Move through day 1, first week, kitchen, brewing, staff, inventory, and late-game optimization.",
    meta: "Stage guide",
  },
];

const databaseLinks = categories.filter((category) => ["recipes", "ingredients", "crops", "fish", "drinks", "crafting"].includes(category.slug));

export default function HomePage() {
  const strategyGuides = [
    "best-early-game-recipes",
    "best-ingredients-to-stockpile",
    "best-drinks-to-keep-on-tap",
    "how-to-prepare-for-trends",
    "staff-hiring-order",
    "how-to-increase-reputation",
  ]
    .map((slug) => getGuide(slug))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuide>> => Boolean(guide))
    .map(guideToCard);
  const popularPages = getPopularPages();

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />
      <section className="relative overflow-hidden border-b border-amber-300/15">
        <Image
          src="/images/tavern-hero-pixel.png"
          alt="Pixel art tavern with an active bar, kitchen, brewing equipment, and dining guests"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120b07] via-[#160e09]/88 to-[#120b07]/58" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-8 px-4 py-16 lg:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f3c35a]">Decision-first strategy guide</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-amber-50 lg:text-7xl">
              Travellers Rest Tavern Planner & Strategy Guide
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-stone-200">
              Plan your tavern, choose what to cook, manage ingredients, prepare for trends, and decide what to do next.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {primaryActions.map((item) => (
              <Link key={item.href} href={item.href} className="wood-panel rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-amber-200/40">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f3c35a]">{item.meta}</p>
                <h2 className="mt-3 text-2xl font-black text-amber-50">{item.title}</h2>
                <p className="mt-2 text-sm text-stone-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">Use the site like a planner</p>
            <h2 className="mt-3 text-3xl font-black text-amber-50">Start with the decision, then check the database.</h2>
            <p className="mt-4 text-stone-300">
              The database is still here, but it now supports tavern decisions instead of being the whole point. Start with your current problem, choose a menu route, then use recipes, ingredients, crops, fish, drinks, and stations to verify the pieces you need in game.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {databaseLinks.map((category) => (
              <Link key={category.slug} href={category.href} className="rounded border border-amber-200/15 bg-[#120c08]/75 p-4 hover:border-amber-200/40">
                <h3 className="font-bold text-amber-50">{category.name}</h3>
                <p className="mt-1 text-sm text-stone-300">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">Strategy modules</p>
              <h2 className="mt-2 text-3xl font-black text-amber-50">Solve the Next Tavern Problem</h2>
            </div>
            <Link href="/guides" className="text-sm font-bold text-amber-200 hover:text-amber-100">
              View all guides
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {strategyGuides.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_1fr] lg:px-6">
        <div className="wood-panel rounded-lg p-5">
          <h2 className="text-3xl font-black text-amber-50">Planner Workflow</h2>
          <ol className="mt-5 space-y-3 text-stone-300">
            <li className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">1. Use What to Do Next to identify the current bottleneck.</li>
            <li className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">2. Use Menu Planner to choose food, drink, and stockpile priorities.</li>
            <li className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">3. Check recipes, ingredients, crops, fish, and stations before committing in game.</li>
          </ol>
        </div>
        <div>
          <h2 className="text-3xl font-black text-amber-50">Popular Strategy Pages</h2>
          <div className="mt-5 grid gap-4">
            {popularPages.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
