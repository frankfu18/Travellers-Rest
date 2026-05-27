"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/search-box";
import { formatDataStatus } from "@/lib/content";
import { popularSearches, searchIndex, searchItems, type SearchItemType, type SearchResult } from "@/lib/search";

const typeLabels: Record<SearchItemType, string> = {
  guide: "Guide",
  recipe: "Recipe",
  drink: "Drink",
  ingredient: "Ingredient",
  crop: "Crop",
  fish: "Fish",
  station: "Station",
  tool: "Tool",
};

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const results = query ? searchItems(query) : [];

  return (
    <>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Travellers Rest database</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">Search Travellers Rest Guide Database</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            Search {searchIndex.length} guides, recipes, drinks, ingredients, crops, fish, crafting stations, and tools.
          </p>
          <div className="mt-8">
            <SearchBox defaultValue={query} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        {!query ? <EmptySearch /> : null}
        {query && results.length === 0 ? <NoResults query={query} /> : null}
        {query && results.length > 0 ? <SearchResults query={query} results={results} /> : null}
      </section>
    </>
  );
}

function EmptySearch() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
      <div>
        <h2 className="text-2xl font-bold text-amber-50">Popular Searches</h2>
        <PopularSearchLinks />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-amber-50">Browse by Category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Guides", "/guides"],
            ["Recipes", "/recipes"],
            ["Drinks", "/drinks"],
            ["Ingredients", "/ingredients"],
            ["Crops", "/crops"],
            ["Fish", "/fish"],
            ["Crafting", "/crafting"],
            ["Tools", "/tools"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="wood-panel rounded-lg p-4 font-bold text-amber-50 hover:border-amber-200/35">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div>
      <div className="rounded border border-amber-200/20 bg-[#1a100b] p-6">
        <h2 className="text-2xl font-bold text-amber-50">No results found</h2>
        <p className="mt-2 text-stone-300">No search results matched "{query}". Try a broader term or browse a core section.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            ["Recipes", "/recipes"],
            ["Drinks", "/drinks"],
            ["Guides", "/guides"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="rounded border border-amber-200/25 bg-amber-200/10 px-4 py-2 font-bold text-amber-100 hover:border-amber-200/50">
              Browse {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-amber-50">Popular Searches</h2>
        <PopularSearchLinks />
      </div>
    </div>
  );
}

function SearchResults({ query, results }: { query: string; results: SearchResult[] }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 border-b border-amber-200/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-50">Search Results</h2>
          <p className="text-sm text-stone-300">
            {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
          </p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {results.map((item) => (
          <article key={item.href} className="wood-panel rounded-lg p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">
                {typeLabels[item.type]}
              </span>
              {item.category ? <span className="text-sm text-stone-300">{item.category}</span> : null}
              {item.dataStatus ? <span className="text-sm text-stone-400">{formatDataStatus(item.dataStatus)}</span> : null}
            </div>
            <h3 className="mt-3 text-2xl font-bold text-amber-50">
              <Link href={item.href}>{item.title}</Link>
            </h3>
            <p className="mt-2 text-stone-300">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.keywords.slice(0, 4).map((keyword) => (
                <span key={keyword} className="rounded border border-amber-200/15 bg-[#120c08] px-2 py-1 text-xs text-stone-300">
                  {keyword}
                </span>
              ))}
            </div>
            <Link href={item.href} className="mt-5 inline-flex rounded border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-sm font-bold text-amber-100 hover:border-amber-200/50">
              View page
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function PopularSearchLinks() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {popularSearches.map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm font-semibold text-stone-200 hover:border-amber-200/45 hover:text-amber-100"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}
