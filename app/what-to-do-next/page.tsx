import type { Metadata } from "next";
import Link from "next/link";
import { WhatToDoNextClient } from "@/components/what-to-do-next-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "What to Do Next in Travellers Rest - Player-Sourced Strategy Planner",
  description:
    "Choose your Travellers Rest stage and main problem to get player-sourced next actions based on English and Japanese community advice for money, cooking, stock, crops, reputation, staff, rooms, and tavern expansion.",
  path: "/what-to-do-next",
  keywords: [
    "Travellers Rest what to do next",
    "Travellers Rest early game tips",
    "Travellers Rest money tips",
    "Travellers Rest best food",
    "Travellers Rest what to plant",
    "Travellers Rest reputation",
    "Travellers Rest staff",
    "Travellers Rest rooms",
    "Travellers Rest Japanese guide",
    "Travellers Rest beginner guide",
  ],
});

export default function WhatToDoNextPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">
            English + Japanese community-informed strategy planner
          </p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">What to Do Next in Travellers Rest</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            Pick your current stage and main bottleneck to see player-sourced next actions based on recurring English and Japanese Travellers Rest community advice.
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
              This planner summarizes recurring advice from Travellers Rest player discussions, English community tips, Japanese guide pages, and Japanese player notes. It does not copy player comments or guide text directly. Instead, it turns repeated community patterns into practical planning rules. Because Travellers Rest is still updated over time, exact item values and balance may change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
