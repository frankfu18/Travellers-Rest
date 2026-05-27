import Link from "next/link";
import { categories } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="border-t border-amber-300/15 bg-[#100a07]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.4fr_2fr] lg:px-6">
        <div>
          <p className="text-lg font-bold text-amber-100">Travellers Rest Guide</p>
          <p className="mt-2 max-w-xl text-sm text-stone-300">
            A lightweight fan-made guide database structure for recipes, ingredients, drinks, crops, fishing, mining,
            crafting, NPCs, and tavern management.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3" aria-label="Footer navigation">
          {categories.map((category) => (
            <Link key={category.slug} href={category.href} className="text-stone-300 hover:text-amber-100">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
