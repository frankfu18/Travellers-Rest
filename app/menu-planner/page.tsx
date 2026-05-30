import type { Metadata } from "next";
import Link from "next/link";
import { MenuPlannerClient } from "@/components/menu-planner-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Menu Planner",
  description:
    "Plan Travellers Rest food, drinks, stockpiles, flexible ingredients, and menu variety by stage, goal, categories, and unlocked stations.",
  path: "/menu-planner",
  keywords: ["Travellers Rest menu planner", "Travellers Rest recipes", "Travellers Rest ingredients"],
});

export default function MenuPlannerPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Planning tool</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Menu Planner</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            Build a practical food and drink plan around your stage, goal, ingredient categories, and stations. This planner is about decision quality, not unverified profit math.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/guides/best-early-game-recipes" className="rounded border border-amber-200/30 bg-amber-200/10 px-4 py-2 font-bold text-amber-100 hover:border-amber-200/50">
              Best Early Recipes
            </Link>
            <Link href="/guides/best-ingredients-to-stockpile" className="rounded border border-amber-200/30 bg-[#120c08] px-4 py-2 font-bold text-stone-100 hover:border-amber-200/50">
              Stockpile Guide
            </Link>
            <Link href="/recipes" className="rounded border border-amber-200/30 bg-[#120c08] px-4 py-2 font-bold text-stone-100 hover:border-amber-200/50">
              Recipes Database
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <MenuPlannerClient />
      </section>
    </main>
  );
}
