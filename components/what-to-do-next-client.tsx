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

type DecisionResult = {
  actions: string[];
  avoid: string[];
  prepare: string[];
  guides: Array<{ title: string; href: string }>;
  database: Array<{ title: string; href: string }>;
};

const stageAdvice: Record<Stage, string[]> = {
  "Day 1": [
    "Keep the day small: prepare one food option, one drink option, and a clean service room before chasing new systems.",
    "Use the first service as a diagnostic day. Write down the first shortage or chore that interrupts you.",
  ],
  "First Week": [
    "Build a repeatable morning routine: check stock, refill the core menu, clean, then open.",
    "Spend only on upgrades that fix a problem you have already seen more than once.",
  ],
  "Early Game": [
    "Choose one growth lane for the next few days: money, reputation, brewing, kitchen stability, or ingredient supply.",
    "Make the core menu reliable before widening the menu or increasing customer pressure.",
  ],
  "Reputation 6+": [
    "Treat staff and capacity as service multipliers, not shortcuts. Hire or expand only after the menu can support more demand.",
    "Standardize prep before opening so staff support a stable system instead of masking weak stock planning.",
  ],
  "Mid Game": [
    "Separate storage into core ingredients, flexible surplus, brewing inputs, and experiment stock.",
    "Review production bottlenecks after service and upgrade the chain that repeatedly blocks income or reputation.",
  ],
  "Late Game": [
    "Optimize around predictability: scheduled brewing, planned menu rotation, reserves for trends, and staff coverage.",
    "Remove weak menu items that consume important ingredients without supporting the current tavern goal.",
  ],
};

const problemAdvice: Record<Problem, DecisionResult> = {
  "I need more money": {
    actions: [
      "Serve a smaller menu made from ingredients you can replace consistently.",
      "Refill the item that sold out first yesterday before testing any new recipe.",
      "Spend on the bottleneck that limits sales today: stock, station flow, drink supply, or room movement.",
    ],
    avoid: [
      "Do not chase one theoretical best item if it breaks tomorrow's supply.",
      "Do not add seats while food or drinks already run out during normal service.",
    ],
    prepare: [
      "Pick one dependable food line and one dependable drink line.",
      "Keep a small reserve of shared inputs before opening.",
    ],
    guides: [
      { title: "How to Make Money Early Game", href: "/guides/how-to-make-money-early-game" },
      { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" },
    ],
    database: [
      { title: "Recipes", href: "/recipes" },
      { title: "Drinks", href: "/drinks" },
    ],
  },
  "I do not know what to cook": {
    actions: [
      "Choose food by supply first: vegetables if farming is stable, fish if fishing is routine, baked food only if grain and oven flow are ready.",
      "Use one flexible recipe slot for surplus and keep the rest of the menu predictable.",
      "Test one new recipe at a time so you can see whether it creates shortages.",
    ],
    avoid: [
      "Do not build a menu from recipe names alone; check ingredient groups and station pressure.",
      "Do not use brewing inputs in food unless drinks are already covered.",
    ],
    prepare: [
      "Sort ingredients into vegetable, fish, meat, fruit, grain, and drink input groups.",
      "Check which stations are actually free before opening.",
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
    actions: [
      "Reduce the menu until every core item has a known restock source.",
      "Protect ingredients shared by cooking and brewing before making optional products.",
      "Use shortages as signals: the first ingredient to disappear should shape tomorrow's farming, fishing, or shopping plan.",
    ],
    avoid: [
      "Do not widen the menu to solve shortages; it usually makes storage harder to read.",
      "Do not spend all flexible ingredients on experiments before service.",
    ],
    prepare: [
      "Create a reserve list for core menu inputs.",
      "Mark surplus ingredients separately so they become optional recipes, not core dependencies.",
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
    actions: [
      "Pause demand growth and simplify the menu until service feels readable again.",
      "Fix the busiest work path first: cleaning, serving, stock checks, or production access.",
      "Open only after core food and drinks are already prepared.",
    ],
    avoid: [
      "Do not add more seating while cleaning or stock refills already interrupt service.",
      "Do not solve a layout problem by adding more production complexity.",
    ],
    prepare: [
      "Move optional production decisions outside service time.",
      "Keep emergency stock for the item that empties fastest.",
    ],
    guides: [
      { title: "Tavern Layout Tips", href: "/guides/tavern-layout-tips" },
      { title: "Beginner Mistakes", href: "/guides/beginner-mistakes" },
    ],
    database: [
      { title: "Crafting Stations", href: "/crafting" },
      { title: "Recipes", href: "/recipes" },
    ],
  },
  "I unlocked staff": {
    actions: [
      "Hire for the chore that repeatedly pulls you away from higher-value planning.",
      "Stabilize stock before using staff to increase service pressure.",
      "Review whether staff support cleaning, serving, rooms, or production prep most in your tavern.",
    ],
    avoid: [
      "Do not hire staff just because the system unlocked; hire to remove a repeated bottleneck.",
      "Do not expand capacity on the same day you are learning staff coverage.",
    ],
    prepare: [
      "Write down the task you most often abandon during service.",
      "Make sure staff are supporting a menu you can actually supply.",
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
    actions: [
      "Use fishing to support food stock when crops are not enough, not as random storage filler.",
      "Add fish recipes only after catches are consistent enough for repeat service.",
      "Stop fishing early enough to prepare the tavern before opening.",
    ],
    avoid: [
      "Do not build the whole menu around catches you cannot repeat.",
      "Do not fish through the prep window if the tavern still lacks food, drinks, or cleaning.",
    ],
    prepare: [
      "Decide which fish-based recipe will receive the catch before you leave.",
      "Keep a non-fish backup food when catches are weak.",
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
    actions: [
      "Start with one baseline drink and protect its ingredients from unrelated cooking.",
      "Brew before service pressure starts so drinks are ready when customers arrive.",
      "Expand drink variety only after the baseline drink survives several normal days.",
    ],
    avoid: [
      "Do not start several drink chains at once if grain, fruit, hops, or yeast are thin.",
      "Do not judge drinks only by expected value; ingredient reliability and timing matter.",
    ],
    prepare: [
      "Reserve brewing inputs before cooking.",
      "Check keg and storage flow so finished drinks reach service.",
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
    actions: [
      "Improve the average service day: reliable stock, clean room, clear paths, and fewer customer delays.",
      "Add comfort or capacity only when the supply chain can support the extra attention.",
      "Use staff, layout, and menu simplification to reduce repeated service failures.",
    ],
    avoid: [
      "Do not treat reputation as separate from stock and service quality.",
      "Do not expand customer demand while the current tavern already feels frantic.",
    ],
    prepare: [
      "Open with food and drinks ready instead of producing reactively during service.",
      "Review the room after busy days and fix the path that slowed you most.",
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

const systemAdvice: Record<System, string> = {
  Farming: "Let farming serve the current menu instead of planting for every possible future recipe.",
  Cooking: "Keep station pressure visible: a recipe is only reliable when ingredients and station time are both available.",
  Brewing: "Protect grain, hops, yeast, fruit, honey, and other drink inputs before using them in optional food.",
  Fishing: "Use fishing as menu support when it solves a food shortage and still leaves time to prep the tavern.",
  Mining: "Mine with a station or upgrade target so the trip creates progress instead of storage clutter.",
  Staff: "Assign staff to the chore that most often breaks your attention during service.",
  "Guest Rooms": "Prepare food, drinks, cleaning, and staff coverage before treating guest rooms as extra demand.",
};

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function WhatToDoNextClient() {
  const [stage, setStage] = useState<Stage>("First Week");
  const [problem, setProblem] = useState<Problem>("I do not know what to cook");
  const [available, setAvailable] = useState<System[]>(["Farming", "Cooking"]);

  const result = useMemo(() => {
    const base = problemAdvice[problem];
    const systemNotes = available.map((item) => systemAdvice[item]);

    return {
      actions: unique([...stageAdvice[stage], ...base.actions, ...systemNotes]).slice(0, 8),
      avoid: base.avoid,
      prepare: unique([...base.prepare, "After service, note what ran out first and what interrupted you most often."]),
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
        <RecommendationPanel title="Recommended Next Actions" items={result.actions} priority="High priority" />
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
