"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const stages = ["Day 1", "First Week", "Early Game", "Reputation 6+", "Mid Game", "Late Game"] as const;
const problems = [
  "I need more money",
  "I do not know what to cook",
  "I run out of ingredients",
  "My tavern is too busy",
  "I unlocked staff",
  "I unlocked fishing",
  "I unlocked brewing",
  "I want more reputation",
] as const;
const systems = ["Farming", "Cooking", "Brewing", "Fishing", "Mining", "Staff", "Guest Rooms"] as const;

type Stage = (typeof stages)[number];
type Problem = (typeof problems)[number];
type System = (typeof systems)[number];

type ActionModule = {
  id: string;
  title: string;
  label: string;
  summary: string;
  items: string[];
  steps?: string[];
};

type DecisionResult = {
  modules: ActionModule[];
  avoid: string[];
  prepare: string[];
  guides: Array<{ title: string; href: string }>;
  database: Array<{ title: string; href: string }>;
};

const actionModules = {
  firstWeek: {
    id: "first-week",
    title: "If You Are Still in the First Week",
    label: "Early rhythm",
    summary:
      "Common player advice is to stop treating every day as a mandatory open day. Early progress often comes from building enough stock that service can run cleanly.",
    items: [
      "Do not feel forced to open the tavern every single day.",
      "Use some early days for gathering, mining, chopping wood, collecting fruit, and building a small stockpile.",
      "Your first goal is not decoration. Your first goal is a repeatable supply loop.",
    ],
    steps: [
      "Gather and produce for one or two days.",
      "Open the tavern when you have enough food and drinks.",
      "Watch what runs out first.",
      "Upgrade the bottleneck before expanding again.",
    ],
  },
  money: {
    id: "money",
    title: "If You Need More Money",
    label: "Income loop",
    summary:
      "Recurring community advice usually points toward repeatable production first: make items you can supply again, then spend early money on tools that create more money.",
    items: [
      "Focus on repeatable products, not fancy products.",
      "Turn wild fruit into juice when your setup supports it instead of relying only on plain water.",
      "Start beer or wine production when the supply chain can support it.",
      "Invest in production stations, aging barrels, kegs, or tools before cosmetic upgrades.",
      "Spend money on things that create more money first.",
    ],
  },
  planting: {
    id: "planting",
    title: "If You Do Not Know What to Plant",
    label: "Crop planning",
    summary:
      "Many players recommend planting around the menu and brewing plan you actually use, instead of filling fields with unrelated crops.",
    items: [
      "Do not plant everything.",
      "Plant around your current menu and drink production.",
      "Prioritize crops that support repeated recipes and brewing.",
      "Consider useful groups such as grains, hops, grapes, tomatoes, onions, and valuable seasonal crops without assuming one fixed meta route.",
      "Recurring crops are useful because they keep producing over time.",
      "Stockpile seasonal ingredients before they become unavailable.",
    ],
  },
  busy: {
    id: "busy",
    title: "If Your Tavern Feels Too Busy",
    label: "Service capacity",
    summary:
      "A common player pattern is to slow table expansion until food, drinks, cleaning, and movement can keep up with demand.",
    items: [
      "Do not add more tables faster than your service capacity.",
      "Before expanding seats, ask whether you can keep enough food stocked.",
      "Check whether you can keep enough drink stocked.",
      "Watch whether dirty tables or cleaning delays are slowing service.",
      "If you spend all day serving instead of producing, pause expansion and fix the service loop.",
      "Consider cleaning upgrades, coasters, staff, or reducing expansion speed.",
    ],
  },
  staff: {
    id: "staff",
    title: "If You Unlocked Staff",
    label: "Staff tradeoff",
    summary:
      "Staff can be a turning point, but player opinions differ on hiring early. Treat it as a tradeoff between freed time and wage pressure.",
    items: [
      "Early staff can free time for farming, brewing, mining, gathering, and planning.",
      "Early wages can hurt profits if the tavern is still too small or understocked.",
      "Hire only for the biggest pain point.",
      "Start with low-cost staff when possible.",
      "Check traits and wages before committing.",
      "Disable unnecessary tasks if your current game systems allow it.",
      "Add more staff only when the tavern size supports it.",
    ],
  },
  fishing: {
    id: "fishing",
    title: "If You Unlocked Fishing",
    label: "Food support",
    summary:
      "Treat fishing as a food-support system, not a reason to ignore tavern prep. A fishing day is strongest when the catch has a planned menu role.",
    items: [
      "Fish when it solves a food shortage or supports a repeatable recipe.",
      "Keep a backup food plan if catches do not match what you wanted.",
      "Do not fish so long that you open with no drinks, cleaning, or cooked stock ready.",
    ],
  },
  brewing: {
    id: "brewing",
    title: "If You Unlocked Brewing",
    label: "Drink baseline",
    summary:
      "Common player advice is to make one drink chain reliable before spreading ingredients across too many beers, wines, or specialty drinks.",
    items: [
      "Start beer or wine production when crops, ingredients, stations, and storage can support it.",
      "Protect grains, hops, grapes, fruit, yeast, and other drink inputs from casual cooking use.",
      "Keep drinks ready before service instead of reacting after the bar runs dry.",
      "Use aging when appropriate, but keep enough ready stock for normal service.",
    ],
  },
  reputation: {
    id: "reputation",
    title: "If You Want More Reputation",
    label: "Quality day",
    summary:
      "Reputation is not only about opening longer. Improve the quality of each service day before simply adding more tables.",
    items: [
      "Improve menu variety once the core menu is stable.",
      "Improve food and drink quality instead of only increasing volume.",
      "Use aged drinks when your stock can afford the delay.",
      "Add comfort through furniture, decoration, and lighting without blocking service paths.",
      "Keep cleanliness under control.",
      "Use staff perks and VIP preparation when those systems are part of your current route.",
    ],
  },
  guestRooms: {
    id: "guest-rooms",
    title: "If You Are Thinking About Guest Rooms",
    label: "Expansion tradeoff",
    summary:
      "Guest rooms are useful, but common advice is to treat them as another workload. They are safer after the core tavern already runs reliably.",
    items: [
      "Consider guest rooms when tavern service is stable.",
      "Make sure food and drink stock is reliable before adding room workload.",
      "Check whether you can afford room furniture without starving production upgrades.",
      "Use staff or a steady daily routine to handle the extra work.",
      "If you still run out of basic stock, stabilize production first.",
    ],
  },
  mistakes: {
    id: "mistakes",
    title: "Common Player Mistakes to Avoid",
    label: "Avoid",
    summary:
      "These are recurring failure patterns that make a tavern feel busy without actually becoming stronger.",
    items: [
      "Opening every day with too little stock.",
      "Buying too many recipes before supporting ingredients are ready.",
      "Planting crops that do not fit the current menu.",
      "Expanding tables before service and cleaning can handle them.",
      "Hiring too much staff before profits are stable.",
      "Spending heavily on decoration before production works.",
      "Selling valuable drinks too early instead of aging when appropriate.",
      "Ignoring seasonal ingredients until they are unavailable.",
    ],
  },
  todayRule: {
    id: "today-rule",
    title: 'Simple "What Should I Do Today?" Rule',
    label: "Daily decision",
    summary: "Ask yourself: What ran out or slowed me down last time I opened?",
    items: [
      "Ran out of drinks: brew, press fruit, age drinks, or add barrels.",
      "Ran out of food: plant menu crops and cook simple repeatable recipes.",
      "Ran out of ingredients: gather, farm, shop, or simplify the menu.",
      "Too many customers to handle: reduce table growth, hire staff, or improve cleaning.",
      "Reputation is slow: improve comfort, variety, quality, and VIP preparation.",
      "Money is slow: focus on higher-value repeatable food and drinks.",
      "Production is slow: add stations before adding more menu complexity.",
    ],
  },
} satisfies Record<string, ActionModule>;

const problemAdvice: Record<Problem, Omit<DecisionResult, "modules"> & { moduleIds: Array<keyof typeof actionModules> }> = {
  "I need more money": {
    moduleIds: ["money", "brewing"],
    avoid: [
      "Do not spend heavily on decoration before production works.",
      "Do not chase fancy one-off products if they break tomorrow's supply.",
      "Do not add more tables if the current tavern already empties your food or drink stock.",
    ],
    prepare: [
      "Build one repeatable food line and one repeatable drink line.",
      "Save early spending for stations, kegs, barrels, tools, and other production improvements.",
      "Watch which product ran out first and make that the next production target.",
    ],
    guides: [
      { title: "How to Make Money Early Game", href: "/guides/how-to-make-money-early-game" },
      { title: "Best Drinks to Keep on Tap", href: "/guides/best-drinks-to-keep-on-tap" },
    ],
    database: [
      { title: "Recipes", href: "/recipes" },
      { title: "Drinks", href: "/drinks" },
    ],
  },
  "I do not know what to cook": {
    moduleIds: ["planting", "firstWeek"],
    avoid: [
      "Do not buy too many recipes before your ingredients can support them.",
      "Do not plan the menu around crops you are not planting or gathering.",
      "Do not use brewing ingredients in food if drinks are already your bottleneck.",
    ],
    prepare: [
      "Choose recipes from the ingredients you can repeat, not from the longest unlock list.",
      "Plant around the active menu and drink plan.",
      "Use one test recipe at a time so shortages are easy to diagnose.",
    ],
    guides: [
      { title: "Menu Planner", href: "/menu-planner" },
      { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" },
    ],
    database: [
      { title: "Recipes", href: "/recipes" },
      { title: "Ingredients", href: "/ingredients" },
    ],
  },
  "I run out of ingredients": {
    moduleIds: ["firstWeek", "planting"],
    avoid: [
      "Do not open every day if the tavern needs a gathering or production day.",
      "Do not plant unrelated crops while menu ingredients keep disappearing.",
      "Do not ignore seasonal ingredients until they are unavailable.",
    ],
    prepare: [
      "Take gathering, farming, mining, or chopping days when stock is too thin.",
      "Stockpile ingredients that support repeated recipes and brewing.",
      "Simplify the menu until every core item has a clear source.",
    ],
    guides: [
      { title: "Best Ingredients to Stockpile", href: "/guides/best-ingredients-to-stockpile" },
      { title: "Inventory Management", href: "/guides/tavern-inventory-management" },
    ],
    database: [
      { title: "Ingredients", href: "/ingredients" },
      { title: "Crops", href: "/crops" },
    ],
  },
  "My tavern is too busy": {
    moduleIds: ["busy", "staff"],
    avoid: [
      "Do not add tables faster than food, drinks, cleaning, and movement can support.",
      "Do not treat more customers as progress if you spend all day reacting.",
      "Do not hire several staff members before profits and duties are clear.",
    ],
    prepare: [
      "Check food stock, drink stock, cleaning speed, table dirt, and service paths before expanding seats.",
      "Use staff, coasters, cleaning upgrades, or slower expansion to reduce pressure.",
      "Make one service improvement before increasing demand again.",
    ],
    guides: [
      { title: "Tavern Layout Tips", href: "/guides/tavern-layout-tips" },
      { title: "Staff Hiring Order", href: "/guides/staff-hiring-order" },
    ],
    database: [
      { title: "Crafting Stations", href: "/crafting" },
      { title: "Recipes", href: "/recipes" },
    ],
  },
  "I unlocked staff": {
    moduleIds: ["staff", "busy"],
    avoid: [
      "Do not hire staff just because the system unlocked.",
      "Do not ignore wages, traits, and unnecessary duties.",
      "Do not expand capacity on the same day you are learning staff coverage.",
    ],
    prepare: [
      "Name the biggest pain point before hiring.",
      "Start with low-cost support if the tavern is still small.",
      "Add more staff only after the tavern size and income support the wages.",
    ],
    guides: [
      { title: "Staff Hiring Order", href: "/guides/staff-hiring-order" },
      { title: "Reputation Guide", href: "/guides/how-to-increase-reputation" },
    ],
    database: [
      { title: "Crafting Stations", href: "/crafting" },
      { title: "Ingredients", href: "/ingredients" },
    ],
  },
  "I unlocked fishing": {
    moduleIds: ["fishing", "firstWeek"],
    avoid: [
      "Do not fish through your entire prep window if the tavern still needs stock or cleaning.",
      "Do not make fish the whole menu unless catches are dependable.",
      "Do not leave catches as storage clutter when they could solve a food shortage.",
    ],
    prepare: [
      "Choose which fish recipe the catch supports before leaving.",
      "Keep a non-fish backup food for weak fishing days.",
      "Use fishing days when food supply needs support, not when drinks or cleaning are the real bottleneck.",
    ],
    guides: [
      { title: "Fishing Basics", href: "/guides/fishing-basics" },
      { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" },
    ],
    database: [
      { title: "Fish", href: "/fish" },
      { title: "Roast Fish", href: "/recipes/roast-fish" },
    ],
  },
  "I unlocked brewing": {
    moduleIds: ["brewing", "money"],
    avoid: [
      "Do not start too many drink chains with thin ingredient reserves.",
      "Do not consume drink inputs in food before checking the bar plan.",
      "Do not age every batch if normal service still needs ready drinks.",
    ],
    prepare: [
      "Protect brewing inputs before cooking experiments.",
      "Make one baseline drink reliable before adding more categories.",
      "Add kegs, barrels, or stations when drink flow is the bottleneck.",
    ],
    guides: [
      { title: "Best Drinks to Keep on Tap", href: "/guides/best-drinks-to-keep-on-tap" },
      { title: "Brewing Basics", href: "/guides/brewing-basics" },
    ],
    database: [
      { title: "Drinks", href: "/drinks" },
      { title: "Brewing Stations", href: "/crafting" },
    ],
  },
  "I want more reputation": {
    moduleIds: ["reputation", "busy"],
    avoid: [
      "Do not assume opening longer is the only reputation answer.",
      "Do not add more tables if quality, comfort, and cleanliness are already weak.",
      "Do not widen the menu before the core food and drinks are reliable.",
    ],
    prepare: [
      "Improve comfort, lighting, cleanliness, food quality, drink quality, and menu variety.",
      "Prepare VIP needs when that system matters to your current stage.",
      "Use staff and room improvements to make each service day smoother.",
    ],
    guides: [
      { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" },
      { title: "Tavern Progression Guide", href: "/progression" },
    ],
    database: [
      { title: "Recipes", href: "/recipes" },
      { title: "Drinks", href: "/drinks" },
    ],
  },
};

const stageModuleIds: Partial<Record<Stage, Array<keyof typeof actionModules>>> = {
  "Day 1": ["firstWeek"],
  "First Week": ["firstWeek"],
  "Mid Game": ["planting"],
  "Late Game": ["reputation"],
};

const systemModuleIds: Partial<Record<System, keyof typeof actionModules>> = {
  Farming: "planting",
  Brewing: "brewing",
  Fishing: "fishing",
  Staff: "staff",
  "Guest Rooms": "guestRooms",
};

const systemNotes: Record<System, string> = {
  Farming: "Use farming to support the active menu, drink plan, and seasonal reserves.",
  Cooking: "Keep cooking simple until repeatable ingredients and station flow are stable.",
  Brewing: "Protect drink inputs and make one baseline drink reliable before expanding categories.",
  Fishing: "Use fishing as planned food support rather than random storage filler.",
  Mining: "Mine with a station, tool, keg, barrel, or upgrade target in mind.",
  Staff: "Use staff to solve a named pain point, then watch whether wages fit the tavern size.",
  "Guest Rooms": "Treat guest rooms as an expansion workload that belongs after service is stable.",
};

function uniqueModules(moduleIds: Array<keyof typeof actionModules>) {
  return Array.from(new Set(moduleIds)).map((id) => actionModules[id]);
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function WhatToDoNextClient() {
  const [stage, setStage] = useState<Stage>("First Week");
  const [problem, setProblem] = useState<Problem>("I do not know what to cook");
  const [available, setAvailable] = useState<System[]>(["Farming", "Cooking"]);

  const result = useMemo(() => {
    const base = problemAdvice[problem];
    const moduleIds: Array<keyof typeof actionModules> = [
      ...(stageModuleIds[stage] ?? []),
      ...base.moduleIds,
      ...available.map((item) => systemModuleIds[item]).filter((item): item is keyof typeof actionModules => Boolean(item)),
      "mistakes",
      "todayRule",
    ];

    return {
      modules: uniqueModules(moduleIds),
      avoid: base.avoid,
      prepare: unique([...base.prepare, ...available.map((item) => systemNotes[item])]).slice(0, 7),
      guides: base.guides,
      database: base.database,
    };
  }, [available, problem, stage]);

  function toggleSystem(system: System) {
    setAvailable((current) => (current.includes(system) ? current.filter((item) => item !== system) : [...current, system]));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <section className="wood-panel rounded-lg p-5 lg:sticky lg:top-24 lg:self-start" aria-label="Decision inputs">
        <label className="block">
          <span className="text-sm font-bold text-amber-100">Current stage</span>
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value as Stage)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {stages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-amber-100">Main problem</span>
          <select
            value={problem}
            onChange={(event) => setProblem(event.target.value as Problem)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {problems.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-amber-100">Available systems</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {systems.map((item) => (
              <label key={item} className="flex items-center gap-3 rounded border border-amber-200/15 bg-[#120c08]/75 px-3 py-2 text-sm text-stone-200">
                <input
                  type="checkbox"
                  checked={available.includes(item)}
                  onChange={() => toggleSystem(item)}
                  className="h-4 w-4 accent-[#f3c35a]"
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="space-y-5" aria-live="polite">
        <section className="rounded-lg border border-amber-200/18 bg-[#1a100b] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">
              Player-sourced
            </span>
            <h2 className="text-2xl font-bold text-amber-50">Player-Sourced Recommended Next Actions</h2>
          </div>
          <p className="mt-3 text-stone-300">
            These recommendations summarize common player advice patterns. They are not one fixed build order; use the module that matches the bottleneck you actually have.
          </p>
          <div className="mt-5 grid gap-4">
            {result.modules.map((module) => (
              <ActionModuleCard key={module.id} module={module} />
            ))}
          </div>
          <p className="mt-5 rounded border border-amber-200/15 bg-[#120c08]/70 p-4 font-bold text-amber-100">
            The best next action is usually the one that fixes your current bottleneck, not the one that unlocks the most new things.
          </p>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <RecommendationPanel title="What to Avoid" items={result.avoid} priority="Mistake warning" tone="warning" />
          <RecommendationPanel title="What to Prepare" items={result.prepare} priority="Prep checklist" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <LinkPanel title="Related Guides" items={result.guides} />
          <LinkPanel title="Related Database Pages" items={result.database} />
        </div>
      </section>
    </div>
  );
}

function ActionModuleCard({ module }: { module: ActionModule }) {
  return (
    <article className="rounded-lg border border-amber-200/15 bg-[#120c08]/70 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded border border-amber-200/25 bg-amber-200/10 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-100">
          {module.label}
        </span>
        <h3 className="text-xl font-bold text-amber-50">{module.title}</h3>
      </div>
      <p className="mt-3 text-sm text-stone-300">{module.summary}</p>
      <ul className="mt-4 grid gap-2 text-sm text-stone-300 md:grid-cols-2">
        {module.items.map((item) => (
          <li key={item} className="rounded border border-amber-200/10 bg-[#1a100b] px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
      {module.steps ? (
        <ol className="mt-4 grid gap-2 text-sm text-stone-300 md:grid-cols-2">
          {module.steps.map((step, index) => (
            <li key={step} className="rounded border border-amber-200/10 bg-[#24160f] px-3 py-2">
              <span className="font-bold text-amber-100">{index + 1}. </span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}
    </article>
  );
}

function RecommendationPanel({
  title,
  items,
  priority,
  tone = "default",
}: {
  title: string;
  items: string[];
  priority: string;
  tone?: "default" | "warning";
}) {
  return (
    <section className={`rounded-lg border p-5 ${tone === "warning" ? "border-[#be6a50]/55 bg-[#2b120d]" : "border-amber-200/18 bg-[#1a100b]"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">{priority}</span>
        <h2 className="text-2xl font-bold text-amber-50">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3 text-stone-300">
        {items.map((item) => (
          <li key={item} className="rounded border border-amber-200/12 bg-[#120c08]/65 p-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LinkPanel({ title, items }: { title: string; items: Array<{ title: string; href: string }> }) {
  return (
    <section className="wood-panel rounded-lg p-5">
      <h2 className="text-2xl font-bold text-amber-50">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded border border-amber-200/15 bg-[#120c08]/70 px-4 py-3 font-bold text-amber-100 hover:border-amber-200/40">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
