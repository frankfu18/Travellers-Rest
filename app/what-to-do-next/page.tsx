import type { Metadata } from "next";
import Link from "next/link";
import { WhatToDoNextClient } from "@/components/what-to-do-next-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "What to Do Next in Travellers Rest - Player-Sourced Tavern Strategy Planner",
  description:
    "A community-informed Travellers Rest planner that helps you decide what to do next based on your current bottleneck: money, food, ingredients, staff, reputation, brewing, or guest rooms.",
  path: "/what-to-do-next",
  keywords: [
    "Travellers Rest what to do next",
    "Travellers Rest early game tips",
    "Travellers Rest money tips",
    "Travellers Rest staff tips",
    "Travellers Rest reputation tips",
    "Travellers Rest guest rooms",
    "Travellers Rest crops and brewing",
  ],
});

export default function WhatToDoNextPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Community-informed tavern planner</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">What to Do Next in Travellers Rest</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            Choose your current bottleneck and get next-step advice based on common player strategies from Travellers Rest community discussions.
          </p>
          <div className="mt-5 grid max-w-4xl gap-3 text-sm text-stone-300 md:grid-cols-3">
            <p className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">
              This is not the only optimal route. Travellers Rest supports different player paths and tavern styles.
            </p>
            <p className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">
              The page summarizes recurring player advice, not copied comments or fixed build orders.
            </p>
            <p className="rounded border border-amber-200/15 bg-[#120c08]/70 p-3">
              Exact prices, timers, item values, and balance can change, so the focus is decision logic and current bottlenecks.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/menu-planner" className="rounded border border-amber-200/30 bg-amber-200/10 px-4 py-2 font-bold text-amber-100 hover:border-amber-200/50">
              Open Menu Planner
            </Link>
            <Link href="/progression" className="rounded border border-amber-200/30 bg-[#120c08] px-4 py-2 font-bold text-stone-100 hover:border-amber-200/50">
              View Progression Guide
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <WhatToDoNextClient />
      </section>
      <section className="border-t border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="wood-panel rounded-lg p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Source note</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-50">Community Notes</h2>
            <p className="mt-3 max-w-4xl text-stone-300">
              This planner summarizes recurring advice from Travellers Rest player discussions on Reddit, Steam Community, and community guides. It avoids copying player comments directly and instead turns repeated community patterns into practical planning rules. Because Travellers Rest is still updated over time, exact item values and balance may change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
