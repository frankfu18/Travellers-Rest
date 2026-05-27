import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { JsonLd } from "@/components/json-ld";
import { SearchBox } from "@/components/search-box";
import { categories } from "@/data/categories";
import { createMetadata } from "@/lib/seo";
import { getBeginnerGuideCards, getLatestGuideCards, getPopularPages } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Guide Database",
  description:
    "Travellers Rest wiki-style guide database for recipes, ingredients, drinks, crops, fishing, mining, crafting, NPCs, and beginner tips.",
  path: "/",
  keywords: [
    "Travellers Rest guide",
    "Travellers Rest recipes",
    "Travellers Rest beginner guide",
    "Travellers Rest wiki",
  ],
});

export default function HomePage() {
  const beginnerGuides = getBeginnerGuideCards();
  const latestGuides = getLatestGuideCards(6);
  const popularPages = getPopularPages();
  const popularSearches = [
    { label: "Travellers Rest beginner guide", href: "/guides/beginner-tavern-guide" },
    { label: "Travellers Rest make money early game", href: "/guides/how-to-make-money-early-game" },
    { label: "Travellers Rest reputation", href: "/guides/how-to-increase-reputation" },
    { label: "Travellers Rest more customers", href: "/guides/how-to-get-more-customers" },
    { label: "Travellers Rest brewing", href: "/guides/brewing-basics" },
    { label: "Travellers Rest best early recipes", href: "/guides/best-early-game-recipes" },
  ];
  const primaryCategories = categories.filter((category) =>
    ["recipes", "ingredients", "drinks", "crops", "fishing", "mining", "crafting", "npcs"].includes(category.slug),
  );

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
          src="/images/tavern-hero.png"
          alt="Cozy fantasy tavern interior for Travellers Rest guides"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.46]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120b07] via-[#160e09]/86 to-[#120b07]/52" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f3c35a]">Wiki-style game guide database</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-amber-50 lg:text-7xl">
              Travellers Rest Guide Database
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-stone-200">
              Recipes, ingredients, drinks, crops, fishing, mining, crafting stations, NPCs, beginner guides, and tavern
              management notes for long-tail Travellers Rest searches.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
          </div>
          <aside className="wood-panel rounded-lg p-5">
            <h2 className="text-xl font-bold text-amber-50">Quick Index</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  className="rounded border border-amber-200/15 bg-[#120c08]/70 px-3 py-2 text-sm font-semibold text-stone-200 hover:border-amber-200/40 hover:text-amber-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">About the game</p>
            <h2 className="mt-3 text-3xl font-black text-amber-50">Plan the tavern, then scale the menu.</h2>
            <p className="mt-4 text-stone-300">
              Travellers Rest is built around repeatable production loops: grow ingredients, cook recipes, brew drinks,
              serve customers, improve reputation, and expand the tavern. This site is structured as a static wiki so
              pages can be generated quickly from clean data files.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.slug} href={category.href} className="wood-panel rounded-lg p-5 hover:border-amber-200/35">
                <h3 className="text-lg font-bold text-amber-50">{category.name}</h3>
                <p className="mt-2 text-sm text-stone-300">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">Start here</p>
              <h2 className="mt-2 text-3xl font-black text-amber-50">Beginner Guides</h2>
            </div>
            <Link href="/guides" className="text-sm font-bold text-amber-200 hover:text-amber-100">
              View all guides
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {beginnerGuides.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">Search demand</p>
          <h2 className="mt-2 text-3xl font-black text-amber-50">Popular Searches</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Link
                key={search.href}
                href={search.href}
                className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm font-semibold text-stone-200 hover:border-amber-200/45 hover:text-amber-100"
              >
                {search.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f3c35a]">Wiki categories</p>
          <h2 className="mt-2 text-3xl font-black text-amber-50">Browse the Database</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {primaryCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="wood-panel rounded-lg p-4 hover:border-amber-200/35"
              >
                <h3 className="font-bold text-amber-50">{category.name}</h3>
                <p className="mt-1 text-sm text-stone-300">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-6">
          <div>
            <h2 className="text-3xl font-black text-amber-50">Latest Guides</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {latestGuides.map((item) => (
                <ContentCard key={item.href} item={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-amber-50">Popular Pages</h2>
            <div className="mt-5 grid gap-4">
              {popularPages.map((item) => (
                <ContentCard key={item.href} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
