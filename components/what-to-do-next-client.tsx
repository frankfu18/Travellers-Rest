"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type StageId = "day-1" | "first-week" | "early-game" | "staff-unlocked" | "guest-rooms" | "mid-game" | "late-game";
type ProblemId =
  | "need-money"
  | "dont-know-cook"
  | "run-out-ingredients"
  | "tavern-too-busy"
  | "unlocked-staff"
  | "need-reputation"
  | "unlocked-brewing"
  | "unlocked-fishing"
  | "guest-rooms";

type Recommendation = {
  title: string;
  communitySummary: string;
  playerConsensus: string[];
  recommendedActions: string[];
  avoid: string[];
  whyPlayersRecommendThis: string;
  guides: Array<{ title: string; href: string }>;
  database: Array<{ title: string; href: string }>;
};

const stages: Array<{ id: StageId; label: string }> = [
  { id: "day-1", label: "Day 1" },
  { id: "first-week", label: "First Week" },
  { id: "early-game", label: "Early Game" },
  { id: "staff-unlocked", label: "Staff Unlocked" },
  { id: "guest-rooms", label: "Guest Rooms" },
  { id: "mid-game", label: "Mid Game" },
  { id: "late-game", label: "Late Game" },
];

const problems: Array<{ id: ProblemId; label: string }> = [
  { id: "need-money", label: "I need more money" },
  { id: "dont-know-cook", label: "I do not know what to cook" },
  { id: "run-out-ingredients", label: "I run out of ingredients" },
  { id: "tavern-too-busy", label: "My tavern is too busy" },
  { id: "unlocked-staff", label: "I unlocked staff" },
  { id: "unlocked-fishing", label: "I unlocked fishing" },
  { id: "unlocked-brewing", label: "I unlocked brewing" },
  { id: "need-reputation", label: "I need more reputation" },
  { id: "guest-rooms", label: "I am thinking about guest rooms" },
];

const defaultGuides = [
  { title: "Menu Planner", href: "/menu-planner" },
  { title: "Tavern Progression Guide", href: "/progression" },
];

const defaultDatabase = [
  { title: "Recipes", href: "/recipes" },
  { title: "Ingredients", href: "/ingredients" },
];

const recommendationsByStageAndProblem: Record<StageId, Partial<Record<ProblemId, Recommendation>>> = {
  "day-1": {
    "need-money": {
      title: "Day 1 Money Plan",
      communitySummary:
        "Many players recommend treating Day 1 as a setup day, not a full profit day. The goal is to create a small but repeatable stock loop before spending money on expansion.",
      playerConsensus: [
        "Day 1 money is usually about preventing a weak start, not maximizing profit immediately.",
        "Common player advice is to gather fruit, wood, stone, and basic materials before opening.",
        "A short service with enough stock is usually better than a long service that empties everything.",
        "Early coins are most useful when they improve production, supply, or tomorrow's prep.",
      ],
      recommendedActions: [
        "Gather fruit, wood, stone, and basic materials before opening.",
        "Prepare a small amount of simple food and drink instead of trying to fill a large menu.",
        "Run a shorter tavern session and stop before stock collapses.",
        "Spend early coins on production or supply needs, not decorations.",
        "Note what ran out first and make that tomorrow's priority.",
      ],
      avoid: [
        "Do not buy too many recipes immediately.",
        "Do not decorate before your food and drink loop works.",
        "Do not expand seats just because customers appear.",
      ],
      whyPlayersRecommendThis:
        "The recurring logic from player discussions is that Day 1 teaches the shape of your bottleneck. If you spend the first day building a small buffer, the next opening gives clearer information about whether food, drinks, ingredients, or service time is the real money problem.",
      guides: [
        { title: "How to Make Money Early Game", href: "/guides/how-to-make-money-early-game" },
        { title: "Beginner Mistakes", href: "/guides/beginner-mistakes" },
      ],
      database: [
        { title: "Recipes", href: "/recipes" },
        { title: "Drinks", href: "/drinks" },
      ],
    },
    "dont-know-cook": {
      title: "Day 1 Cooking Plan",
      communitySummary:
        "Common player advice is to keep the Day 1 menu simple. Choose food from what you can already gather, buy, or replace instead of chasing a complicated recipe list.",
      playerConsensus: [
        "The first menu should be small enough to understand.",
        "Players often recommend testing one or two repeatable foods before buying more recipes.",
        "Your first cooking decision should follow your ingredients, not the other way around.",
        "A useful early dish is one you can restock after service.",
      ],
      recommendedActions: [
        "Choose recipes based on ingredients you can already gather or buy reliably.",
        "Keep the menu small until you understand ingredient demand.",
        "Test one simple recipe before buying several more.",
        "Prefer food that does not compete with your drink production ingredients.",
        "Watch which ingredient disappears first after service.",
      ],
      avoid: [
        "Do not unlock recipes just because they look profitable.",
        "Do not make every dish that is available.",
        "Do not let one ingredient be consumed by too many dishes.",
      ],
      whyPlayersRecommendThis:
        "Players often warn that a wide early menu hides the real problem. A tiny menu makes it obvious whether the issue is ingredient supply, station time, or opening before enough food is ready.",
      guides: [
        { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" },
        { title: "Menu Planner", href: "/menu-planner" },
      ],
      database: [
        { title: "Recipes", href: "/recipes" },
        { title: "Ingredients", href: "/ingredients" },
      ],
    },
    "run-out-ingredients": {
      title: "Day 1 Ingredient Recovery Plan",
      communitySummary:
        "A recurring community tip is that early ingredient shortages are usually a supply rhythm problem, not proof that you need more recipes.",
      playerConsensus: [
        "You do not need to open every day if the pantry is empty.",
        "Gathering, cooking, then opening is a stronger loop than weak daily openings.",
        "Players often recommend reducing active menu items until supply is readable.",
        "Shared ingredients should be separated before service.",
      ],
      recommendedActions: [
        "Close or shorten service if your pantry is empty.",
        "Spend a day gathering and preparing instead of forcing another weak opening.",
        "Reduce your active menu to one or two reliable items.",
        "Separate ingredients for food, drinks, and future stockpile.",
        "Track the ingredient that stops your production most often.",
      ],
      avoid: [
        "Do not keep selling until every ingredient hits zero.",
        "Do not add new recipes while the old ones are already unstable.",
        "Do not assume more variety helps if supply is the real bottleneck.",
      ],
      whyPlayersRecommendThis:
        "Travellers Rest tends to punish empty storage more than slow preparation. Players often recover faster by pausing service pressure, rebuilding a pantry buffer, and reopening with a smaller menu.",
      guides: [
        { title: "Best Ingredients to Stockpile", href: "/guides/best-ingredients-to-stockpile" },
        { title: "Inventory Management", href: "/guides/tavern-inventory-management" },
      ],
      database: [
        { title: "Ingredients", href: "/ingredients" },
        { title: "Crops", href: "/crops" },
      ],
    },
  },
  "first-week": {
    "need-money": {
      title: "First Week Money Loop",
      communitySummary:
        "Many players recommend building a repeatable money chain during the first week instead of spending early profits on visual upgrades.",
      playerConsensus: [
        "Repeatable food and drink usually matter more than fancy products.",
        "Fruit drinks, basic meals, and early brewing are common directions when supply supports them.",
        "Production capacity often pays back earlier than decoration.",
        "Seeds, fuel, materials, kegs, barrels, and stations can protect the next earning day.",
      ],
      recommendedActions: [
        "Build one reliable drink line before expanding menu complexity.",
        "Use gathered fruit or farm output to create repeatable sellable drinks.",
        "Start early brewing when your crop and fuel supply can support it.",
        "Invest in production capacity before comfort decoration.",
        "Save a portion of money for seeds, fuel, and materials.",
      ],
      avoid: [
        "Do not spend early profits only on visual upgrades.",
        "Do not open long days without enough prepared stock.",
        "Do not chase too many production chains at once.",
      ],
      whyPlayersRecommendThis:
        "The common player pattern is to make the tavern fund its own next day. A repeatable food or drink line gives you clearer income than a collection of products you cannot refill.",
      guides: [
        { title: "How to Make Money Early Game", href: "/guides/how-to-make-money-early-game" },
        { title: "Best Drinks to Keep on Tap", href: "/guides/best-drinks-to-keep-on-tap" },
      ],
      database: [
        { title: "Drinks", href: "/drinks" },
        { title: "Crafting Stations", href: "/crafting" },
      ],
    },
    "dont-know-cook": {
      title: "First Week Cooking Priorities",
      communitySummary:
        "Common player advice is to plan the first-week menu around stable supply. Crops such as tomatoes, onions, grains, hops, and grapes can be useful examples, but no single crop is a universal route.",
      playerConsensus: [
        "Your menu should solve inventory, not create new inventory problems.",
        "Add one new dish at a time and watch what it consumes.",
        "Food planning and drink planning should not starve each other.",
        "Staple ingredients are valuable because they support multiple service days.",
      ],
      recommendedActions: [
        "Pick recipes that match crops or ingredients you can repeat.",
        "Add one new dish at a time and observe how it affects stock.",
        "Keep staple ingredients available for multiple service days.",
        "Balance food needs with brewing needs so one system does not starve the other.",
        "Use the menu to reduce surplus ingredients when possible.",
      ],
      avoid: [
        "Do not buy a large recipe list before farming supports it.",
        "Do not use all of one crop in several different dishes.",
        "Do not ignore drink production when planning food.",
      ],
      whyPlayersRecommendThis:
        "Players often describe the first week as the point where random cooking starts to break down. A menu tied to repeated crops, gathered ingredients, and drink plans gives the tavern a rhythm instead of a daily scramble.",
      guides: [
        { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" },
        { title: "Menu Planner", href: "/menu-planner" },
      ],
      database: [
        { title: "Recipes", href: "/recipes" },
        { title: "Crops", href: "/crops" },
      ],
    },
    "run-out-ingredients": {
      title: "First Week Stockpile Plan",
      communitySummary:
        "A recurring community warning is that the first week can drain the pantry if you open every day without dedicated gathering or farming time.",
      playerConsensus: [
        "Preparation days are normal, especially before the supply loop is stable.",
        "Recurring crops can be useful because they keep producing over time.",
        "Seasonal ingredients should be reserved before they become unavailable.",
        "Ingredients need roles: cooking, brewing, or future stockpile.",
      ],
      recommendedActions: [
        "Schedule preparation days instead of opening every day.",
        "Grow crops that support repeated food or drink production.",
        "Keep a reserve of seasonal ingredients before they disappear.",
        "Simplify the menu when multiple dishes compete for the same ingredient.",
        "Split stock into immediate cooking, brewing, and reserve use.",
      ],
      avoid: [
        "Do not let every service day consume your whole pantry.",
        "Do not plant random crops without a menu or brewing purpose.",
        "Do not ignore seasonal limits until the season changes.",
      ],
      whyPlayersRecommendThis:
        "The player logic is that shortages compound. Once food, drink, and crop supply all compete for the same small pantry, a planned stockpile day can be more valuable than another weak opening.",
      guides: [
        { title: "Best Ingredients to Stockpile", href: "/guides/best-ingredients-to-stockpile" },
        { title: "Tavern Inventory Management", href: "/guides/tavern-inventory-management" },
      ],
      database: [
        { title: "Ingredients", href: "/ingredients" },
        { title: "Crops", href: "/crops" },
      ],
    },
  },
  "early-game": {
    "tavern-too-busy": {
      title: "Early Game Service Capacity Plan",
      communitySummary:
        "Players often warn that a busy tavern is not automatically a healthy tavern. If service quality drops, slow expansion and fix cleaning, serving, food, and drink flow first.",
      playerConsensus: [
        "More tables are only useful when stock and cleaning can keep up.",
        "Dirty tables and slow service can quietly drag down the day.",
        "Staff, coasters, and layout changes are capacity tools, not decorations.",
        "Expansion speed should stay below service capacity.",
      ],
      recommendedActions: [
        "Stop adding tables until service feels stable.",
        "Improve cleaning and serving flow before increasing seats.",
        "Use staff only where they solve the biggest bottleneck.",
        "Keep food and drinks close to service needs.",
        "Shorten opening hours if the tavern becomes unmanageable.",
      ],
      avoid: [
        "Do not treat every empty floor space as a place for more tables.",
        "Do not expand customer capacity before stock and cleaning can keep up.",
        "Do not ignore dirty tables or slow service.",
      ],
      whyPlayersRecommendThis:
        "The recurring logic from player discussions is that over-expansion creates fake progress. A smaller tavern with clean service often performs better than a larger tavern that constantly runs out of stock or attention.",
      guides: [
        { title: "Tavern Layout Tips", href: "/guides/tavern-layout-tips" },
        { title: "Staff Hiring Order", href: "/guides/staff-hiring-order" },
      ],
      database: [
        { title: "Crafting Stations", href: "/crafting" },
        { title: "Recipes", href: "/recipes" },
      ],
    },
  },
  "staff-unlocked": {
    "unlocked-staff": {
      title: "Staff Unlocked Hiring Plan",
      communitySummary:
        "Players are split on early hiring, so the practical advice is a tradeoff: staff can free your time, but wages can hurt a small tavern if they do not solve a real bottleneck.",
      playerConsensus: [
        "Early staff can free time for farming, gathering, brewing, and mining.",
        "Wages can eat early profit if the tavern is too small.",
        "Hiring should target the current pain point, not every possible task.",
        "Traits, wages, and task toggles matter when choosing staff.",
      ],
      recommendedActions: [
        "Identify the task that steals the most time from you.",
        "Hire one low-cost worker for that bottleneck first.",
        "Check wage and traits before committing.",
        "Use task toggles if available so staff focus on useful jobs.",
        "Compare profit before and after hiring.",
      ],
      avoid: [
        "Do not hire staff just because the system unlocked.",
        "Do not hire for tasks you can still handle easily.",
        "Do not ignore wages when judging whether the tavern is profitable.",
      ],
      whyPlayersRecommendThis:
        "The community tradeoff is time versus cost. Staff are strongest when they give you back time for production and planning, but weakest when they add wages to a tavern that still lacks stable stock.",
      guides: [
        { title: "Staff Hiring Order", href: "/guides/staff-hiring-order" },
        { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" },
      ],
      database: [
        { title: "Crafting Stations", href: "/crafting" },
        { title: "Drinks", href: "/drinks" },
      ],
    },
    "need-reputation": {
      title: "Staff Unlocked Reputation Plan",
      communitySummary:
        "Many players recommend improving the quality of service days after staff unlocks. Reputation is not only about opening longer or adding tables.",
      playerConsensus: [
        "Comfort, variety, quality, cleanliness, and lighting all support better service.",
        "Staff can protect service quality when assigned to the right bottleneck.",
        "VIP preparation should happen before the important day, not during panic service.",
        "More seats can hurt reputation goals if quality collapses.",
      ],
      recommendedActions: [
        "Improve comfort and layout before adding more tables.",
        "Keep service clean and consistent during longer openings.",
        "Use staff to protect service quality, not just to increase customer count.",
        "Prepare higher-quality food or drink before important service days.",
        "Add variety only when the supply chain can support it.",
      ],
      avoid: [
        "Do not chase reputation by over-expanding seats.",
        "Do not open longer if service quality collapses.",
        "Do not add menu variety that your pantry cannot support.",
      ],
      whyPlayersRecommendThis:
        "Player advice often frames reputation as the result of a good service day. Staff help most when they reduce mess, waiting, or overload, which lets comfort, quality, and variety actually matter.",
      guides: [
        { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" },
        { title: "Tavern Progression Guide", href: "/progression" },
      ],
      database: [
        { title: "Recipes", href: "/recipes" },
        { title: "Drinks", href: "/drinks" },
      ],
    },
  },
  "guest-rooms": {
    "guest-rooms": {
      title: "Guest Rooms Expansion Plan",
      communitySummary:
        "Common player advice is to treat guest rooms as expansion, not as the first fix for a weak tavern. Rooms work better after food, drinks, cleaning, and furniture costs are under control.",
      playerConsensus: [
        "Guest rooms are useful, but they add workload and setup cost.",
        "Stable tavern service should come before room investment.",
        "Rooms need furniture, comfort, cleaning, and routine support.",
        "If basic stock still runs out, production should come first.",
      ],
      recommendedActions: [
        "Build guest rooms only after food and drink service is stable.",
        "Prepare enough furniture and comfort before relying on room income.",
        "Check whether staff or your routine can handle extra cleaning and service.",
        "Keep the main tavern profitable while rooms ramp up.",
        "Treat rooms as expansion, not a rescue plan for a broken tavern loop.",
      ],
      avoid: [
        "Do not invest heavily in rooms while your basic tavern still runs out of stock.",
        "Do not build rooms before you can furnish them properly.",
        "Do not assume rooms replace the need for a stable food and drink business.",
      ],
      whyPlayersRecommendThis:
        "Players often frame guest rooms as a second income layer. They are stronger when the main tavern already has reliable supply and service, because rooms add another routine instead of repairing the old one.",
      guides: [
        { title: "Tavern Progression Guide", href: "/progression" },
        { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" },
      ],
      database: [
        { title: "Crafting Stations", href: "/crafting" },
        { title: "Ingredients", href: "/ingredients" },
      ],
    },
  },
  "mid-game": {},
  "late-game": {},
};

const stageContexts: Record<StageId, { label: string; focus: string; warning: string }> = {
  "day-1": {
    label: "Day 1",
    focus: "a tiny setup loop, short service, and learning what breaks first",
    warning: "over-spending or expanding before the pantry tells you what the real bottleneck is",
  },
  "first-week": {
    label: "First Week",
    focus: "repeatable stock, early production, and a menu that can survive multiple service days",
    warning: "opening every day while food, drink, and crop supply are still thin",
  },
  "early-game": {
    label: "Early Game",
    focus: "controlled expansion, reliable food and drinks, and service capacity",
    warning: "adding demand faster than cleaning, serving, cooking, or brewing can handle",
  },
  "staff-unlocked": {
    label: "Staff Unlocked",
    focus: "using wages to remove one real bottleneck instead of hiring for every task",
    warning: "letting staff costs hide a weak production loop",
  },
  "guest-rooms": {
    label: "Guest Rooms",
    focus: "adding rooms only after the main tavern can support extra workload",
    warning: "using rooms as a rescue plan before basic service is stable",
  },
  "mid-game": {
    label: "Mid Game",
    focus: "throughput, aging choices, menu value, staff efficiency, and room/tavern balance",
    warning: "keeping old early-game habits when the bottleneck has moved to production capacity",
  },
  "late-game": {
    label: "Late Game",
    focus: "optimization, quality, staff coverage, trend buffers, and removing weak menu lines",
    warning: "running every unlocked system without checking whether it still supports the tavern goal",
  },
};

const problemContexts: Record<ProblemId, { label: string; focus: string; actions: string[]; avoid: string[]; guides: Recommendation["guides"]; database: Recommendation["database"] }> = {
  "need-money": {
    label: "Money",
    focus: "repeatable food and drink value, production throughput, and spending that creates more income",
    actions: ["Audit what sold out last service.", "Invest in the production step that blocks more sales.", "Keep a reserve for seeds, fuel, ingredients, or station materials."],
    avoid: ["Do not spend only on cosmetics.", "Do not add several new chains at once."],
    guides: [{ title: "How to Make Money Early Game", href: "/guides/how-to-make-money-early-game" }, { title: "Menu Planner", href: "/menu-planner" }],
    database: [{ title: "Recipes", href: "/recipes" }, { title: "Drinks", href: "/drinks" }],
  },
  "dont-know-cook": {
    label: "Cooking",
    focus: "matching recipes to ingredients you can replace and stations you can keep running",
    actions: ["Pick one core food and one backup food.", "Choose dishes from your actual crop, fish, or shop supply.", "Test one new dish before buying more recipes."],
    avoid: ["Do not make every available dish.", "Do not let one ingredient feed too many menu items."],
    guides: [{ title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" }, { title: "Menu Planner", href: "/menu-planner" }],
    database: [{ title: "Recipes", href: "/recipes" }, { title: "Ingredients", href: "/ingredients" }],
  },
  "run-out-ingredients": {
    label: "Ingredient Recovery",
    focus: "stockpile roles, prep days, seasonal reserves, and simplifying the menu",
    actions: ["Schedule a gathering or farming day.", "Split ingredients into cooking, brewing, and reserve roles.", "Remove menu items that compete for the same scarce ingredient."],
    avoid: ["Do not open until every key ingredient hits zero.", "Do not add recipes while old recipes are unstable."],
    guides: [{ title: "Best Ingredients to Stockpile", href: "/guides/best-ingredients-to-stockpile" }, { title: "Inventory Management", href: "/guides/tavern-inventory-management" }],
    database: [{ title: "Ingredients", href: "/ingredients" }, { title: "Crops", href: "/crops" }],
  },
  "tavern-too-busy": {
    label: "Service Capacity",
    focus: "tables, cleaning, serving, layout, prepared stock, and staff coverage",
    actions: ["Pause table growth.", "Fix the chore that interrupts you most.", "Shorten service if the tavern becomes unmanageable."],
    avoid: ["Do not treat more customers as automatic progress.", "Do not ignore dirty tables or slow service."],
    guides: [{ title: "Tavern Layout Tips", href: "/guides/tavern-layout-tips" }, { title: "Staff Hiring Order", href: "/guides/staff-hiring-order" }],
    database: [{ title: "Crafting Stations", href: "/crafting" }, { title: "Recipes", href: "/recipes" }],
  },
  "unlocked-staff": {
    label: "Hiring",
    focus: "wage tradeoffs, traits, task focus, and the task that steals the most player time",
    actions: ["Identify the biggest service pain point.", "Hire one role for that pain point first.", "Compare profit and workload after the hire."],
    avoid: ["Do not hire just because the system unlocked.", "Do not ignore wages or traits."],
    guides: [{ title: "Staff Hiring Order", href: "/guides/staff-hiring-order" }, { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" }],
    database: [{ title: "Crafting Stations", href: "/crafting" }, { title: "Drinks", href: "/drinks" }],
  },
  "need-reputation": {
    label: "Reputation",
    focus: "comfort, cleanliness, quality, menu variety, staff support, and VIP preparation",
    actions: ["Improve comfort and cleanliness before adding more tables.", "Prepare better food or drinks for important service days.", "Use staff to protect quality instead of only increasing traffic."],
    avoid: ["Do not chase reputation with unstable expansion.", "Do not add variety your pantry cannot support."],
    guides: [{ title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" }, { title: "Progression Guide", href: "/progression" }],
    database: [{ title: "Recipes", href: "/recipes" }, { title: "Drinks", href: "/drinks" }],
  },
  "unlocked-brewing": {
    label: "Brewing",
    focus: "one reliable drink chain, protected brewing inputs, kegs, barrels, and aging choices",
    actions: ["Choose one baseline drink.", "Protect grain, hops, fruit, yeast, or other drink inputs.", "Keep ready stock outside longer aging plans."],
    avoid: ["Do not start too many drink chains at once.", "Do not age everything if service still needs ready drinks."],
    guides: [{ title: "Best Drinks to Keep on Tap", href: "/guides/best-drinks-to-keep-on-tap" }, { title: "Brewing Basics", href: "/guides/brewing-basics" }],
    database: [{ title: "Drinks", href: "/drinks" }, { title: "Crafting Stations", href: "/crafting" }],
  },
  "unlocked-fishing": {
    label: "Fishing",
    focus: "turning catches into planned menu support without stealing the whole prep day",
    actions: ["Choose the recipe your catch should support.", "Keep a non-fish backup food.", "Stop fishing early enough to prepare service."],
    avoid: ["Do not rely on catches you cannot repeat.", "Do not fish through the whole prep window."],
    guides: [{ title: "Fishing Basics", href: "/guides/fishing-basics" }, { title: "Best Early Game Recipes", href: "/guides/best-early-game-recipes" }],
    database: [{ title: "Fish", href: "/fish" }, { title: "Roast Fish", href: "/recipes/roast-fish" }],
  },
  "guest-rooms": {
    label: "Guest Rooms",
    focus: "room setup, furniture, cleaning workload, staff support, and stable tavern service",
    actions: ["Stabilize food and drink first.", "Prepare furniture and comfort before relying on rooms.", "Keep the main tavern profitable while rooms ramp up."],
    avoid: ["Do not build rooms before furnishing them.", "Do not use rooms as a rescue plan for weak stock."],
    guides: [{ title: "Progression Guide", href: "/progression" }, { title: "How to Increase Reputation", href: "/guides/how-to-increase-reputation" }],
    database: [{ title: "Crafting Stations", href: "/crafting" }, { title: "Ingredients", href: "/ingredients" }],
  },
};

function getRecommendation(stageId: StageId, problemId: ProblemId): Recommendation {
  const exact = recommendationsByStageAndProblem[stageId][problemId];

  if (exact) return exact;

  const stage = stageContexts[stageId];
  const problem = problemContexts[problemId];

  return {
    title: `${stage.label} ${problem.label} Plan`,
    communitySummary: `Recurring community advice for ${stage.label.toLowerCase()} is to handle ${problem.focus} through ${stage.focus}, instead of following a fixed build order.`,
    playerConsensus: [
      `Many players recommend judging the next move by the bottleneck from your last service day.`,
      `Common player advice is to keep ${stage.focus} in mind before adding more systems.`,
      `Players often warn against ${stage.warning}.`,
      `This stage works better when ${problem.focus} has a clear role in the tavern loop.`,
    ],
    recommendedActions: [
      ...problem.actions,
      `Use the ${stage.label.toLowerCase()} context to decide whether this should happen before or after your next opening.`,
      "Check the result after one service day before adding another new system.",
    ],
    avoid: [...problem.avoid, `Do not let ${stage.warning} become the hidden reason the plan fails.`],
    whyPlayersRecommendThis: `This works because the advice combines the current stage with the current problem. ${stage.label} decisions should be paced around ${stage.focus}, while the selected bottleneck needs ${problem.focus}. That makes the recommendation change when either selector changes.`,
    guides: problem.guides,
    database: problem.database,
  };
}

export function WhatToDoNextClient() {
  const [stageId, setStageId] = useState<StageId>("day-1");
  const [problemId, setProblemId] = useState<ProblemId>("need-money");

  const recommendation = useMemo(() => getRecommendation(stageId, problemId), [problemId, stageId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <section className="wood-panel rounded-lg p-5 lg:sticky lg:top-24 lg:self-start" aria-label="Decision inputs">
        <label className="block">
          <span className="text-sm font-bold text-amber-100">Current stage</span>
          <select
            value={stageId}
            onChange={(event) => setStageId(event.target.value as StageId)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {stages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-amber-100">Main problem</span>
          <select
            value={problemId}
            onChange={(event) => setProblemId(event.target.value as ProblemId)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {problems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 rounded border border-amber-200/15 bg-[#120c08]/70 p-4 text-sm text-stone-300">
          Choose the stage you are actually in and the bottleneck that bothered you most last time you opened. The recommendation changes from that exact combination.
        </div>
      </section>

      <section className="space-y-5" aria-live="polite">
        <section className="rounded-lg border border-amber-200/18 bg-[#1a100b] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">
              Player-sourced
            </span>
            <h2 className="text-2xl font-bold text-amber-50">Recommended Next Actions</h2>
          </div>
          <h3 className="mt-5 text-3xl font-black text-amber-50">{recommendation.title}</h3>
          <section className="mt-5 rounded border border-amber-200/15 bg-[#120c08]/70 p-4">
            <h4 className="font-bold text-amber-100">Community Summary</h4>
            <p className="mt-2 text-stone-300">{recommendation.communitySummary}</p>
          </section>
        </section>

        <ListPanel title="What Players Usually Agree On" label="Consensus" items={recommendation.playerConsensus} />
        <ListPanel title="Recommended Next Actions" label="Actions" items={recommendation.recommendedActions} ordered />
        <ListPanel title="Common Mistakes Players Warn About" label="Avoid" items={recommendation.avoid} warning />

        <section className="rounded-lg border border-amber-200/18 bg-[#1a100b] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">Why this works</span>
            <h2 className="text-2xl font-bold text-amber-50">Why Players Recommend This</h2>
          </div>
          <p className="mt-4 text-stone-300">{recommendation.whyPlayersRecommendThis}</p>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <LinkPanel title="Related Guides" items={recommendation.guides.length > 0 ? recommendation.guides : defaultGuides} />
          <LinkPanel title="Related Database Pages" items={recommendation.database.length > 0 ? recommendation.database : defaultDatabase} />
        </div>
      </section>
    </div>
  );
}

function ListPanel({ title, label, items, ordered = false, warning = false }: { title: string; label: string; items: string[]; ordered?: boolean; warning?: boolean }) {
  const listClassName = "mt-4 grid gap-3 text-stone-300";
  const itemClassName = "rounded border border-amber-200/12 bg-[#120c08]/65 p-3";
  const content = items.map((item, index) => (
    <li key={item} className={itemClassName}>
      {ordered ? <span className="font-bold text-amber-100">{index + 1}. </span> : null}
      {item}
    </li>
  ));

  return (
    <section className={`rounded-lg border p-5 ${warning ? "border-[#be6a50]/55 bg-[#2b120d]" : "border-amber-200/18 bg-[#1a100b]"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">{label}</span>
        <h2 className="text-2xl font-bold text-amber-50">{title}</h2>
      </div>
      {ordered ? <ol className={listClassName}>{content}</ol> : <ul className={listClassName}>{content}</ul>}
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
