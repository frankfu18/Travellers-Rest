import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Tavern Progression Guide",
  description:
    "A stage-by-stage Travellers Rest progression guide for day 1, first week, early income, kitchen, brewing, staff, inventory, and late-game tavern optimization.",
  path: "/progression",
  keywords: ["Travellers Rest progression", "Travellers Rest tavern guide", "Travellers Rest strategy guide"],
});

const stages = [
  {
    title: "Day 1 Priorities",
    goal: "Create a stable first service loop instead of trying every system immediately.",
    checklist: ["Prepare one simple food path.", "Keep one drink path ready.", "Clean and open with a readable room.", "After service, note the first shortage or chore failure."],
    unlocks: ["Only unlock what supports food, drink, cleaning, or movement."],
    focus: "Simple food, simple drink, and observation.",
    mistakes: ["Expanding before you know what actually runs out.", "Treating the first day as a race instead of a diagnostic run."],
    guides: [{ title: "What to Do Next", href: "/what-to-do-next" }, { title: "Beginner Mistakes", href: "/guides/beginner-mistakes" }],
    tools: [{ title: "Menu Planner", href: "/menu-planner" }],
  },
  {
    title: "First Week Plan",
    goal: "Turn daily service into a repeatable routine you can improve one bottleneck at a time.",
    checklist: ["Check stock before opening.", "Refill yesterday's first shortage.", "Spend on repeated problems.", "Keep farming, fishing, and cooking tied to the active menu."],
    unlocks: ["Production or room upgrades that solve a bottleneck you have already seen."],
    focus: "Repeatable crop or fish food plus one drink baseline.",
    mistakes: ["Buying upgrades because they are new.", "Adding menu variety before the core menu is dependable."],
    guides: [{ title: "First Week Guide", href: "/guides/what-to-do-first-week" }, { title: "Best Early Recipes", href: "/guides/best-early-game-recipes" }],
    tools: [{ title: "What to Do Next", href: "/what-to-do-next" }],
  },
  {
    title: "Early Game Stable Income",
    goal: "Make coins through reliability: stocked menu, controlled demand, and spending that removes bottlenecks.",
    checklist: ["Run a small menu.", "Protect shared ingredients.", "Avoid capacity growth when stock is thin.", "Reinvest in production, layout, or drink flow."],
    unlocks: ["Stations or room changes that make tomorrow easier to serve."],
    focus: "Foods and drinks you can replace consistently.",
    mistakes: ["Chasing one high-value idea without checking supply.", "Selling ingredients before assigning them to food, drink, or reserve roles."],
    guides: [{ title: "Money Guide", href: "/guides/how-to-make-money-early-game" }, { title: "Best Ingredients to Stockpile", href: "/guides/best-ingredients-to-stockpile" }],
    tools: [{ title: "Menu Planner", href: "/menu-planner" }],
  },
  {
    title: "First Kitchen Setup",
    goal: "Use kitchen capacity to make dependable food, not a scattered recipe list.",
    checklist: ["Choose recipes by ingredient source.", "Check station pressure.", "Keep one backup food.", "Test new recipes one at a time."],
    unlocks: ["Food Prep Table, Oven, or other cooking support when the ingredient chain is ready."],
    focus: "Vegetable, fish, or grain food based on what you can restock.",
    mistakes: ["Unlocking a station before ingredients can feed it.", "Using drink inputs in food without protecting the bar."],
    guides: [{ title: "Best Early Recipes", href: "/guides/best-early-game-recipes" }, { title: "Inventory Management", href: "/guides/tavern-inventory-management" }],
    tools: [{ title: "Recipes", href: "/recipes" }],
  },
  {
    title: "First Brewing Setup",
    goal: "Build one reliable drink chain before expanding into specialty or aged drinks.",
    checklist: ["Reserve drink inputs.", "Prepare before service.", "Connect finished drinks to kegs or service storage.", "Add variety only after the baseline survives normal demand."],
    unlocks: ["Brewing, fermentation, keg, and aging tools when they support a named drink plan."],
    focus: "One baseline drink plus a protected input reserve.",
    mistakes: ["Starting several drink chains at once.", "Aging stock you still need for normal service."],
    guides: [{ title: "Best Drinks on Tap", href: "/guides/best-drinks-to-keep-on-tap" }, { title: "Brewing Basics", href: "/guides/brewing-basics" }],
    tools: [{ title: "Drinks", href: "/drinks" }],
  },
  {
    title: "Reputation 6+ Staff Plan",
    goal: "Use staff to remove repeated service friction, then scale demand carefully.",
    checklist: ["Name the chore that interrupts you most.", "Hire or assign around that chore.", "Keep stock ready before staff-supported service.", "Observe a normal day before expanding again."],
    unlocks: ["Staff roles that support cleaning, serving, rooms, or service flow."],
    focus: "Stable food and drink that staff can help deliver smoothly.",
    mistakes: ["Hiring without a bottleneck.", "Treating staff as permission to overexpand immediately."],
    guides: [{ title: "Staff Hiring Order", href: "/guides/staff-hiring-order" }, { title: "Reputation Guide", href: "/guides/how-to-increase-reputation" }],
    tools: [{ title: "What to Do Next", href: "/what-to-do-next" }],
  },
  {
    title: "Mid Game Inventory Management",
    goal: "Make storage readable so the tavern can support more systems without constant shortages.",
    checklist: ["Separate core stock from surplus.", "Protect brewing inputs.", "Keep flexible trend buffers.", "Review unused stock after service."],
    unlocks: ["Storage and production upgrades that reduce repeated inventory confusion."],
    focus: "Core menu stock, flexible surplus recipes, and planned drink reserves.",
    mistakes: ["Hoarding everything without assigning roles.", "Letting surplus consume station time before core stock is safe."],
    guides: [{ title: "Inventory Management", href: "/guides/tavern-inventory-management" }, { title: "Prepare for Trends", href: "/guides/how-to-prepare-for-trends" }],
    tools: [{ title: "Menu Planner", href: "/menu-planner" }],
  },
  {
    title: "Late Game Tavern Optimization",
    goal: "Optimize the tavern around predictable production, staff coverage, trends, and clean menu rotation.",
    checklist: ["Schedule brewing and prep.", "Keep trend-ready reserves.", "Remove weak menu items.", "Tune staff and room flow around real service pressure."],
    unlocks: ["Advanced stations and room changes that improve a mature production schedule."],
    focus: "Reliable core menu plus planned trend or variety slots.",
    mistakes: ["Keeping every item active just because it is unlocked.", "Optimizing around old habits instead of current bottlenecks."],
    guides: [{ title: "Prepare for Trends", href: "/guides/how-to-prepare-for-trends" }, { title: "Best Drinks on Tap", href: "/guides/best-drinks-to-keep-on-tap" }],
    tools: [{ title: "What to Do Next", href: "/what-to-do-next" }, { title: "Menu Planner", href: "/menu-planner" }],
  },
];

export default function ProgressionPage() {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Stage route</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Tavern Progression Guide</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">
            A practical route for deciding what matters at each stage: what to stabilize, what to unlock, what to cook or brew, and what to avoid.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/what-to-do-next" className="rounded border border-amber-200/30 bg-amber-200/10 px-4 py-2 font-bold text-amber-100 hover:border-amber-200/50">
              Use What to Do Next
            </Link>
            <Link href="/menu-planner" className="rounded border border-amber-200/30 bg-[#120c08] px-4 py-2 font-bold text-stone-100 hover:border-amber-200/50">
              Plan the Menu
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-5">
          {stages.map((stage, index) => (
            <article key={stage.title} className="wood-panel rounded-lg p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">Stage {index + 1}</span>
                <h2 className="text-2xl font-bold text-amber-50">{stage.title}</h2>
              </div>
              <p className="mt-3 text-stone-300">
                <strong className="text-amber-100">Main goal:</strong> {stage.goal}
              </p>
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <StageBlock title="Checklist" items={stage.checklist} />
                <StageBlock title="Recommended Unlocks" items={stage.unlocks} />
                <StageBlock title="Common Mistakes" items={stage.mistakes} warning />
              </div>
              <p className="mt-5 rounded border border-amber-200/15 bg-[#120c08]/70 p-4 text-stone-300">
                <strong className="text-amber-100">Recommended food/drink focus:</strong> {stage.focus}
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <LinkGroup title="Related Guides" items={stage.guides} />
                <LinkGroup title="Related Tools" items={stage.tools} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function StageBlock({ title, items, warning = false }: { title: string; items: string[]; warning?: boolean }) {
  return (
    <section className={`rounded border p-4 ${warning ? "border-[#be6a50]/45 bg-[#2b120d]" : "border-amber-200/15 bg-[#120c08]/70"}`}>
      <h3 className="font-bold text-amber-50">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-stone-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function LinkGroup({ title, items }: { title: string; items: Array<{ title: string; href: string }> }) {
  return (
    <section>
      <h3 className="font-bold text-amber-50">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm font-bold text-amber-100 hover:border-amber-200/50">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
