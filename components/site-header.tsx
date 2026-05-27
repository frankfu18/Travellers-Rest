import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { categories } from "@/data/categories";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-300/15 bg-[#140d09]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Travellers Rest Guide home">
          <span className="grid size-9 place-items-center rounded border border-amber-300/30 bg-amber-300/12 text-lg font-black text-amber-200">
            TR
          </span>
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.16em] text-amber-100">Travellers Rest</span>
            <span className="block text-xs text-stone-300">Guide Database</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {categories.slice(0, 7).map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="rounded px-3 py-2 text-sm font-semibold text-stone-200 hover:bg-amber-200/10 hover:text-amber-100"
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <SearchBox compact />
        </div>
        <Link href="/search" className="rounded px-3 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-200/10 lg:hidden">
          Search
        </Link>
      </div>
    </header>
  );
}
