"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBox({ compact = false, defaultValue = "" }: { compact?: boolean; defaultValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form className={compact ? "flex w-full gap-2" : "flex w-full max-w-2xl flex-col gap-3 sm:flex-row"} role="search" onSubmit={onSubmit}>
      <label htmlFor={compact ? "header-search" : "site-search"} className="sr-only">
        Search Travellers Rest guides
      </label>
      <input
        id={compact ? "header-search" : "site-search"}
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={compact ? "Search..." : "Search guides, recipes, drinks, fish..."}
        className={
          compact
            ? "min-h-9 w-44 rounded border border-amber-200/25 bg-[#120c08]/90 px-3 text-sm text-amber-50 outline-none placeholder:text-stone-400 focus:border-amber-200/60"
            : "min-h-12 flex-1 rounded border border-amber-200/25 bg-[#120c08]/90 px-4 text-base text-amber-50 outline-none placeholder:text-stone-400 focus:border-amber-200/60"
        }
      />
      <button
        type="submit"
        className={
          compact
            ? "min-h-9 rounded border border-amber-200/35 bg-amber-300 px-3 text-sm font-bold text-stone-950 hover:bg-amber-200"
            : "min-h-12 rounded border border-amber-200/35 bg-amber-300 px-5 font-bold text-stone-950 hover:bg-amber-200"
        }
      >
        Search
      </button>
    </form>
  );
}
