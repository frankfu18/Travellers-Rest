import type { Metadata } from "next";
import Link from "next/link";
import { WhatToDoNextClient } from "@/components/what-to-do-next-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest What to Do Next Planner",
  description:
    "Choose your current Travellers Rest stage, problem, and unlocked systems to get practical next actions, avoid lists, preparation steps, and related guides.",
  path: "/what-to-do-next",
  keywords: ["Travellers Rest what to do next", "Travellers Rest planner", "Travellers Rest strategy"],
});

export default function WhatToDoNextPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Decision assistant</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">What to Do Next in Travellers Rest</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            Pick your current stage, main bottleneck, and available systems. The planner gives you a practical next-step route without relying on unverified prices, levels, or timers.
          </p>
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
    </main>
  );
}
