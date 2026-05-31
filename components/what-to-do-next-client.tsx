"use client";

import { useMemo, useState } from "react";

type StageId = "first-week" | "early-game" | "mid-game" | "late-game";

type ProblemId =
  | "need-money"
  | "what-to-cook"
  | "run-out-stock"
  | "what-to-plant"
  | "too-busy"
  | "need-reputation"
  | "staff-and-rooms";

type ActionItem = {
  title: string;
  body: string;
};

type Recommendation = {
  title: string;
  actions: ActionItem[];
};

type RecommendationSeed = {
  title: string;
  actions: string[];
};

const stages: Array<{ id: StageId; label: string; description: string }> = [
  {
    id: "first-week",
    label: "First Week",
    description: "You are learning the basic tavern loop and still building your first reliable stock.",
  },
  {
    id: "early-game",
    label: "Early Game",
    description: "You have basic production running and are deciding what to stabilize or unlock next.",
  },
  {
    id: "mid-game",
    label: "Mid Game",
    description: "You have more systems open and need to optimize production, staff, reputation, orders, and expansion.",
  },
  {
    id: "late-game",
    label: "Late Game",
    description: "You are optimizing high-value production, comfort, rooms, staff, and long-term layout.",
  },
];

const problems: Array<{ id: ProblemId; label: string }> = [
  { id: "need-money", label: "I need more money" },
  { id: "what-to-cook", label: "I do not know what to cook" },
  { id: "run-out-stock", label: "I keep running out of stock" },
  { id: "what-to-plant", label: "I do not know what to plant" },
  { id: "too-busy", label: "My tavern is too busy" },
  { id: "need-reputation", label: "I need more reputation" },
  { id: "staff-and-rooms", label: "Staff / rooms / expansion" },
];

const recommendationsByStageAndProblem = {
  "first-week": {
    "need-money": {
      title: "First Week Money Setup",
      actions: [
        "Use the first week to gather fruit, wood, stone, coal, and basic materials before long openings; English beginner advice and Japanese starter guides both treat preparation as part of progress, not wasted time.",
        "Turn gathered fruit into simple drinks before opening when your setup allows it; many player tips describe prepared drinks as a steadier early coin source than relying only on basic water service.",
        "Open for a shorter session, watch whether food, drinks, fuel, or ingredients run out first, and make that shortage the next day's production target.",
        "Spend early coins on seeds, fuel, tools, stations, or supply needs before decoration; recurring player warnings say cosmetic comfort matters more after the production loop works.",
        "Progress tutorial tasks while stocking food and materials, because Japanese beginner guide patterns often pair shop-rating growth with steady resource preparation rather than pure tavern hours.",
      ],
    },
    "what-to-cook": {
      title: "First Week Simple Menu Plan",
      actions: [
        "Choose one simple recipe from ingredients you already gather or buy reliably; many players value a dish you can restock over a menu that only looks impressive.",
        "Test one recipe at a time and check which ingredient disappears after service, so the menu teaches you demand instead of hiding it behind too many dishes.",
        "Avoid letting one early ingredient feed several dishes at once; player notes often trace food shortages back to a single shared input being spent everywhere.",
        "Use the Japanese recipe-page mindset of easy materials and repeatable production: choose foods that consume common ingredients without locking the tavern into a fragile route.",
        "Keep drink inputs separate from food experiments, because early community advice often treats food and drink supply as two loops that can accidentally starve each other.",
      ],
    },
    "run-out-stock": {
      title: "First Week Stock Recovery Plan",
      actions: [
        "Take a dedicated gathering and prep day if the pantry is thin; players often say weak daily openings are worse than one closed day that rebuilds the loop.",
        "Build a gather to cook or brew to open rhythm, then repeat it until you can predict what runs out first.",
        "Cut the active menu down to a few reliable items, because first-week stock problems usually come from serving too broadly before storage exists.",
        "Track whether the shortage is food, drink, fuel, or materials; Japanese beginner flow advice often treats material and ingredient preparation as separate early tasks.",
        "Keep a small reserve instead of selling everything to zero, since recurring player advice says an empty pantry makes the next day slower and more expensive.",
      ],
    },
    "what-to-plant": {
      title: "First Week Crop Choice Plan",
      actions: [
        "Plant for the food and drink you are actually making, not for every crop that is available; players often warn that random fields create random storage.",
        "Use grains, hops, grapes, tomatoes, and onions as planning examples because they can support food or drink routes, but verify exact uses in your current version.",
        "Consider tomatoes, green peppers, melons, and watermelons as broader Japanese-guide examples of useful crop planning, without treating any one crop as a fixed best answer.",
        "Give recurring crops space when you need stable supply over several openings, because repeated harvests reduce the pressure to replant constantly.",
        "Save seasonal ingredients before the season changes; community stockpile advice often points to seasonal gaps as the reason a once-stable menu suddenly fails.",
      ],
    },
    "too-busy": {
      title: "First Week Calm Service Plan",
      actions: [
        "Stop adding tables until cleaning, serving, and stock checks feel manageable; players often warn that busy does not always mean better.",
        "Shorten opening hours if you spend the entire day reacting, because early service should reveal bottlenecks without destroying the next day's prep.",
        "Move furniture and storage so you do less running during service; layout distance is a common hidden reason beginners feel overwhelmed.",
        "Prepare food and drinks before opening rather than during customer pressure, a pattern repeated in both English tips and Japanese beginner progression notes.",
        "Treat stable shop rating and customer handling as gradual progress, not a reason to create unlimited traffic before supply is ready.",
      ],
    },
    "need-reputation": {
      title: "First Week Reputation Foundation",
      actions: [
        "Open with enough stock for a clean service day; player advice often values a small menu that does not run out over a wide menu that collapses.",
        "Keep the tavern clean, comfortable, and readable before chasing more tables, because early reputation work depends on basic service quality.",
        "Use decoration carefully after food and drink supply is stable; comfort helps more when customers are not waiting on missing stock.",
        "Prepare materials and ingredients alongside customer service, matching Japanese starter-guide themes that connect shop rating with tutorial flow and resource readiness.",
        "Review the last service day for the first reputation drag, such as empty drinks, dirty tables, or awkward movement, then fix that before expanding.",
      ],
    },
    "staff-and-rooms": {
      title: "First Week Expansion Restraint",
      actions: [
        "Delay guest rooms and major expansion until the basic food and drink loop survives several openings; players usually frame rooms as later workload, not a rescue plan.",
        "If staff becomes tempting early, compare the wage against the task they remove, because community advice treats staff as time relief rather than instant profit.",
        "Ask whether stock and service are stable before adding space; expansion makes shortages more visible if the pantry is already weak.",
        "Keep room-related spending behind seeds, materials, and production needs, since early resources usually create more value when they strengthen tomorrow's opening.",
        "Treat housekeeper-style help as situational while room count is low, echoing Japanese player notes that room staff becomes more important after lodging pressure grows.",
      ],
    },
  },
  "early-game": {
    "need-money": {
      title: "Early Game Drink and Production Income",
      actions: [
        "Pick one drink chain such as juice, beer, wine, or ale and keep it stocked for several service days; English player discussions often describe unstable drink output as an early profit bottleneck.",
        "Add production stations, kegs, or aging barrels only when they support the chain you are already feeding, not because every unlock needs immediate use.",
        "Put money into the step that raises output, such as crop supply, brewing capacity, fuel, or storage, before adding visual upgrades.",
        "Use board orders as a supplemental money and XP source when they fit your production, a theme that appears often in Japanese guide-style progression advice.",
        "Avoid opening very long days without prepared stock; steady repeatable sales usually beat one exhausting service that empties every reserve.",
      ],
    },
    "what-to-cook": {
      title: "Early Game Repeatable Food Route",
      actions: [
        "Build the menu around stable crops and repeatable ingredients, then add dishes gradually instead of buying a large recipe list at once.",
        "Watch which dish drains ingredients too quickly and either reduce its use or plant around it before making it a core item.",
        "Keep food from stealing brewing inputs when drinks are carrying income; many players warn that grain, fruit, or sweet ingredients can become cross-system bottlenecks.",
        "Use examples like salad, yogurt, sausage, chorizo, or fruit yogurt as ingredient-logic ideas from Japanese recipe discussions, not as fixed best-in-slot claims.",
        "Keep one everyday dish and one surplus-use dish so the menu can serve customers while also reducing storage clutter.",
      ],
    },
    "run-out-stock": {
      title: "Early Game Weekly Restock Rhythm",
      actions: [
        "Schedule farming, gathering, or prep days each week if openings keep emptying storage; early stock problems often come from too-wide menus or too-long service.",
        "Separate food, drink, fuel, and material reserves so board orders, cooking, brewing, and tavern service do not quietly compete for the same pile.",
        "Add production capacity when stock fails repeatedly, because more opening hours rarely fix a station or ingredient bottleneck.",
        "Check drink supply first if customers are served food but income still feels unstable; players often mention drinks becoming the hidden early shortage.",
        "Keep order-board goals from consuming the ingredients needed for the next opening, a planning conflict often highlighted in Japanese mid-progression notes.",
      ],
    },
    "what-to-plant": {
      title: "Early Game Crop and Brewing Field Plan",
      actions: [
        "Divide planting by purpose: money crops, cooking crops, and brewing crops, rather than filling every plot with one idea.",
        "Use grains, hops, and grapes when your drink plan needs support, while tomatoes, onions, or green peppers can anchor repeatable cooking.",
        "Treat melons and watermelons as seasonal high-use examples from Japanese crop discussions, but check whether they fit your current menu before overplanting.",
        "Keep some recurring or multi-harvest crops for stable supply, especially if your tavern opens frequently.",
        "Avoid planting the whole field for a single product unless you already know where the output will go after service.",
      ],
    },
    "too-busy": {
      title: "Early Game Service Capacity Check",
      actions: [
        "Pause table expansion until food refills, drink refills, cleaning, and customer handling all survive a normal opening.",
        "Consider the first staff hire only after you identify the biggest pressure point, because early wages should buy back time you actually need.",
        "Tighten layout around storage, bar, tables, and cleaning paths so each service action takes fewer steps.",
        "Give bartender-style help higher priority when drink variety and refills become the pain point, reflecting Japanese player notes about staff value changing with pressure.",
        "Shorten service or reduce seats before quality collapses; recurring advice says stable service beats a crowded room you cannot manage.",
      ],
    },
    "need-reputation": {
      title: "Early Game Rating Growth Plan",
      actions: [
        "Raise reputation through comfort, variety, quality, and cleanliness rather than only staying open longer.",
        "Keep the tavern small enough to serve consistently; players often compare stable small service favorably against chaotic expansion.",
        "Prepare better food or drink before reputation-focused service days, especially if VIP-style needs or higher-quality expectations are becoming relevant.",
        "Add decoration after production is reliable, since comfort gains are easier to feel when food and drink stock no longer collapses.",
        "Advance tutorial, materials, and ingredient preparation together with shop-rating goals, matching Japanese beginner-guide progression patterns.",
      ],
    },
    "staff-and-rooms": {
      title: "Early Game Staff and Expansion Tradeoff",
      actions: [
        "Hire for the largest current pain point, not for every job; staff is a tradeoff between freed time and wages.",
        "Check wage and traits before hiring, then review whether the worker actually gives you time for farming, gathering, brewing, or cooking.",
        "Treat guest rooms as expansion after the tavern loop is stable, not as a fix for missing food or drinks.",
        "Expand seating only when stock and service capacity already keep up, because added demand magnifies weak production.",
        "Choose bartender, bouncer, or housekeeper priority by pressure point, echoing Japanese player notes that staff value depends on drinks, disruptive guests, or room workload.",
      ],
    },
  },
  "mid-game": {
    "need-money": {
      title: "Mid Game Throughput Profit Plan",
      actions: [
        "Review which stations sit idle and which drinks wait on aging; mid-game advice from English and Japanese sources often shifts from unlocking more items to improving throughput.",
        "Use staff time savings to feed production, not just to open longer, because mid-game profit depends on prepared batches reaching service.",
        "Balance room income and tavern service so one side does not consume all food, drinks, or cleaning attention.",
        "Plan board orders, skill-tree upgrades, and production chains together when they use overlapping materials.",
        "Stop adding new products until the current high-demand food or drink line has reliable inputs and storage.",
      ],
    },
    "what-to-cook": {
      title: "Mid Game Menu Refinement",
      actions: [
        "Trim recipes by profit role, ingredient availability, and repeatability instead of keeping every unlocked food active.",
        "Separate everyday service food from higher-value batches so rare ingredients do not vanish during normal openings.",
        "Adjust the menu to match farm output after several harvests rather than guessing from a single service day.",
        "Use cheese platter or rose-style drink examples as advanced value ideas from Japanese recipe discussions, while avoiding exact value claims until verified.",
        "Remove dishes that slow production or compete with drinks unless they solve a clear stock or reputation need.",
      ],
    },
    "run-out-stock": {
      title: "Mid Game Inventory Threshold Plan",
      actions: [
        "Create minimum stock thresholds for food, drink, aging, rooms, and board orders so each system stops consuming blindly.",
        "Assign crops and processed goods to specific roles before service, because mid-game shortages often come from expansion moving faster than storage rules.",
        "Increase production capacity or station scheduling when the same ingredient queue blocks several days in a row.",
        "Use staff-freed time to replenish materials and ingredients instead of simply extending service hours.",
        "Plan order-board requests separately from tavern demand, reflecting Japanese guide advice that orders, skills, and business needs can compete for the same stock.",
      ],
    },
    "what-to-plant": {
      title: "Mid Game Field Allocation Plan",
      actions: [
        "Plan fields around the current bottleneck: basic food supply, brewing inputs, high-value seasonal crops, or room-supporting reserves.",
        "Keep part of the farm on dependable staples so one seasonal experiment cannot break everyday service.",
        "Use another section for crops that support brewing or advanced recipes when the station chain is ready.",
        "Treat tea leaves, saplings, or similar long-horizon investments as situational planning, not immediate stock fixes.",
        "Avoid sacrificing long-term supply for one service day's profit unless the replacement plan is already planted.",
      ],
    },
    "too-busy": {
      title: "Mid Game Flow and Staff Assignment",
      actions: [
        "Map whether the pressure comes from table layout, cleaning, drink refills, food serving, rooms, or disruptive customers before expanding again.",
        "Reassign staff tasks around the bottleneck instead of hiring randomly; a worker is most useful when the duty matches the actual slowdown.",
        "Use bouncer-style support when troublesome guests become a repeated operation drain, echoing Japanese player notes about reducing manual pressure.",
        "Move tables, storage, and service paths so staff and player routes do not collide during peak service.",
        "Stop solving every crowding issue with more seats; mid-game service problems usually need flow correction, not only capacity.",
      ],
    },
    "need-reputation": {
      title: "Mid Game Reputation Loop",
      actions: [
        "Link comfort, quality, variety, VIP preparation, and staff coverage into one service plan rather than treating reputation as only more traffic.",
        "Use higher-quality drinks and food when supply can support them, because reputation gains feel steadier when premium service does not create shortages.",
        "Balance hall comfort and room comfort if lodging is open, so one reputation path does not weaken the other.",
        "Combine shop-rating goals with board orders and skill-tree progression when they share production needs, a pattern common in Japanese mid-game guide logic.",
        "Keep service consistent before scaling crowds; many players warn that reputation work suffers when the tavern is visually bigger but operationally messier.",
      ],
    },
    "staff-and-rooms": {
      title: "Mid Game Rooms and Staff Split",
      actions: [
        "Use guest rooms as a second income layer only after the main tavern has dependable stock and service coverage.",
        "Budget furniture, cleaning, comfort, and food demand together so rooms do not steal resources from the hall.",
        "Split staff duties clearly between bar, hall, crowd control, and room upkeep as pressure points become distinct.",
        "Treat expansion as a bottleneck fix, not a content unlock; more rooms or space should solve a known constraint.",
        "Raise housekeeper priority as room count grows, matching Japanese player notes that room staff becomes more valuable once lodging workload is real.",
      ],
    },
  },
  "late-game": {
    "need-money": {
      title: "Late Game Profit Optimization",
      actions: [
        "Shift from basic sales to high-value batches, premium drinks, aging plans, room income, and staff efficiency.",
        "Review layout bottlenecks that keep expensive products from reaching customers smoothly; late-game money often comes from removing friction.",
        "Keep long-term production steady instead of relying on longer openings that exhaust staff, stock, or cleaning capacity.",
        "Use board orders and premium products as extra optimization paths, not replacements for the core production chain.",
        "Audit which mature systems still create profit and which only consume rare ingredients, then reduce the weak lines.",
      ],
    },
    "what-to-cook": {
      title: "Late Game Menu Optimization",
      actions: [
        "Optimize the menu rather than expanding it; late-game cooking should focus on strong roles, stable supply, and useful variety.",
        "Pair high-value dishes with dependable base foods so premium ingredients do not collapse everyday service.",
        "Use storage patterns from several days to decide what stays on the menu and what becomes occasional stock use.",
        "Balance food, drinks, and room demand before adding another complex dish.",
        "Follow the Japanese recipe-planning idea of choosing foods that raise value, consume existing stock, and do not crush the supply chain.",
      ],
    },
    "run-out-stock": {
      title: "Late Game Supply Chain Repair",
      actions: [
        "Treat repeated stockouts as a scale problem and identify whether the real bottleneck is fields, processing, aging, staff, layout, or rooms.",
        "Create batch production plans for food, drinks, and room demand instead of restocking only after service fails.",
        "Keep seasonal reserves and safety stock for inputs that feed multiple high-value products.",
        "Coordinate hall service, rooms, board orders, and skill-tree goals so they do not fight over the same batch of materials.",
        "Reduce or rotate products that consume rare ingredients faster than your long-term production can replace them.",
      ],
    },
    "what-to-plant": {
      title: "Late Game Long-Term Planting Plan",
      actions: [
        "Divide fields into baseline crops, brewing support, premium seasonal crops, and long-term room or aging demand.",
        "Keep basic crop supply protected even when high-value crops look tempting, because late-game menus still fail if staples disappear.",
        "Use special crops, saplings, or tea-style investments as long-horizon planning tools rather than emergency fixes.",
        "Plant for the drinks and dishes that define your mature tavern, not every recipe that exists.",
        "Review crop output against storage after several openings and replace plots that create surplus with no production role.",
      ],
    },
    "too-busy": {
      title: "Late Game Operations Pressure Plan",
      actions: [
        "Assume late-game busyness is usually a layout, staff-task, or room-pressure problem before adding more seats.",
        "Tune bartender, bouncer, and housekeeper roles according to whether the pressure is drink refills, disruptive guests, or room upkeep.",
        "Remove inefficient table placements that create walking time without improving actual service throughput.",
        "Separate hall and room workload where possible so cleaning and service paths do not collide.",
        "Do not solve a service bottleneck with more capacity until the existing route, staff coverage, and stock flow are stable.",
      ],
    },
    "need-reputation": {
      title: "Late Game Reputation Ceiling Plan",
      actions: [
        "Raise the service quality ceiling through premium food, premium drinks, comfort, lighting, layout, and staff perks rather than chaotic longer openings.",
        "Prepare VIP or high-quality service days in advance so reputation-focused openings do not drain emergency stock.",
        "Use room comfort and hall comfort together if lodging is part of the tavern identity.",
        "Review whether staff assignments protect cleanliness and flow, because late reputation work often fails through small service delays.",
        "Follow Japanese guide logic that shop rating depends on food, drinks, comfort, and stable hospitality, not customer count alone.",
      ],
    },
    "staff-and-rooms": {
      title: "Late Game Staff and Room Optimization",
      actions: [
        "Fine-tune staff duties instead of simply hiring more people; late-game value comes from matching roles to actual pressure.",
        "Expand rooms only when furniture, comfort, cleaning, food, and drink production can scale together.",
        "Use housekeeper support when room workload is genuinely large, while bartender and bouncer value depends on hall pressure.",
        "Check that each expansion solves a bottleneck rather than creating another route for stock, staff, or layout to fail.",
        "Keep the main tavern and lodging loop synchronized so room income does not weaken premium service in the hall.",
      ],
    },
  },
} satisfies Record<StageId, Record<ProblemId, RecommendationSeed>>;

const extraActionsByStageAndProblem = {
  "first-week": {
    "need-money": [
      "Before opening, count prepared meals and drinks separately. If one side is low, spend the morning fixing that side instead of trying to earn through a half-stocked service.",
      "Keep one small stack of fruit for drinks and one stack of basic food ingredients for meals. Selling the raw materials too early makes tomorrow's opening harder to prepare.",
      "If you end the day with coins but no fuel, wood, or ingredients, treat the next morning as a supply run. Early profit only matters if it turns into the next batch of sellable stock.",
    ],
    "what-to-cook": [
      "Keep your first food menu to one or two dishes that use ingredients you can replace tomorrow. If one dish empties your only onion stack, remove it until onions are easy to refill.",
      "Before buying another recipe, cook a small batch of the dish you already chose and run one service. The empty ingredient slot after that service tells you what the menu can really support.",
      "Pick food that leaves room for drinks. If the same fruit, grain, or dairy item is needed for your bar plan, do not spend the whole stack on a test dish.",
    ],
    "run-out-stock": [
      "Use one closed day as a prep day when storage is empty. Gather fruit, cut wood, mine fuel materials, cook a small batch, then reopen with enough stock to learn the next bottleneck.",
      "Write down the first shelf that empties during service. If drinks vanish first, prepare drinks tomorrow; if meals vanish first, cook before opening; if fuel blocks production, gather materials.",
      "Do not refill every category equally. Refill the item that stopped service first, then add a small buffer for the second item that dropped low.",
    ],
    "what-to-plant": [
      "Assign every early plot a job before planting: daily meals, drink ingredients, or reserve stock. A full field is not useful if none of it feeds the next menu.",
      "Plant a small test patch for new crops instead of converting the whole field. After one harvest, decide whether the crop actually supports your recipes or drink chain.",
      "Keep at least one familiar crop line active while testing seasonal crops. That gives the kitchen something predictable even if the new crop is awkward to use.",
    ],
    "too-busy": [
      "If tables stay dirty after each rush, stop adding seats and rearrange the room so cleaning paths are shorter. More customers only make the same dirty-table problem louder.",
      "Open after food and drinks are already stocked, then close before both shelves hit zero. A controlled short service teaches more than a frantic full day.",
      "Put storage and service points where you naturally pass them. If you cross the room for every refill, the layout is stealing time before the tavern is truly busy.",
    ],
    "need-reputation": [
      "Start with one clean, stocked service day. Reputation work is easier when customers are not waiting while you cook, brew, or clean from behind.",
      "Add comfort only after the room still functions. A decorated room with blocked paths and empty drinks will not feel better to run.",
      "If reputation feels slow, check the basic service chain first: meals ready, drinks ready, tables clean, room lit, and no extra seats you cannot handle.",
    ],
    "staff-and-rooms": [
      "Do not build guest rooms just because the option appears. Rooms add furniture cost, cleaning pressure, and supply demand before the main tavern has proven it can stay stocked.",
      "If you test one staff hire, choose the job that keeps you from leaving the tavern. If drinks pull you away from farming every day, solve that before hiring for a quiet task.",
      "Delay expansion after any service day that ended with empty shelves. Extra space should follow a solved supply problem, not create a larger version of it.",
    ],
  },
  "early-game": {
    "need-money": [
      "Check the slowest part of the drink loop before adding another product: fruit supply, brewing input, keg space, or aging capacity. Add the missing piece rather than starting a second weak chain.",
      "Run the same money item for several openings and watch whether it fails from ingredients, station time, or service space. The fix is different for each failure.",
      "Set aside money for the next batch of seeds, fuel, or brewing inputs before buying comfort pieces. Early profit disappears quickly if the next production cycle cannot start.",
    ],
    "what-to-cook": [
      "Build the day around one repeatable food item and one backup dish. Once those survive a normal service, add variety; adding variety before that hides which ingredient is missing.",
      "If your menu looks full but storage empties after one service, cut the menu down to dishes supported by crops you can replace within a few days.",
      "Use surplus ingredients for a rotating special instead of turning them into permanent menu items. A surplus dish should solve storage overflow, not become tomorrow's shortage.",
    ],
    "run-out-stock": [
      "At the start of each in-game week, choose one prep block for crops, one for drinks, and one for materials. Skipping prep is usually why early stock collapses during service.",
      "If drinks run out before food, spend the next morning on fruit pressing, brewing, keg preparation, or ingredient reserves before you open again.",
      "Keep order-board deliveries away from your opening stock. If an order consumes the same ingredients as tonight's menu, finish the tavern batch first or delay the order.",
    ],
    "what-to-plant": [
      "Reserve part of the field for boring staples even when new crops unlock. Staples keep the kitchen alive while specialty crops prove whether they are worth more space.",
      "Match drink crops to the drink chain you can actually process. Grapes or hops do not help if the station, fuel, or storage step is the real blocker.",
      "Use a small seasonal crop block for higher-use crops, then compare the harvest with actual sales. Keep it only if it turns into menu or drink stock quickly.",
    ],
    "too-busy": [
      "Before adding a table, run one service and count the interruptions: cleaning, drinks, meals, or pathing. Upgrade the task that interrupts most often.",
      "Consider a bartender when drink orders keep interrupting cooking, farming, or brewing. If drinks are not the slow part yet, keep the coins and solve the real bottleneck first.",
      "Move refills closer to the service route before hiring extra help. A better path can remove pressure that looks like a staffing problem.",
    ],
    "need-reputation": [
      "Prepare one reputation-focused service day with enough meals, enough drinks, clean tables, lighting, and no new seats. Quality falls apart when you add traffic on the same day.",
      "Add menu variety from ingredients you already produce. A new dish that empties rare stock can hurt the next service more than it helps reputation.",
      "Use decoration to improve a working room, not to cover a broken one. Fix empty drinks, dirty tables, and long walking paths first.",
    ],
    "staff-and-rooms": [
      "Hire one worker only after you know which task is costing you the most time. A bartender makes sense when drinks slow service, but several early wages can turn a good day into a low-profit day.",
      "Treat guest rooms as an expansion project, not an emergency income fix. If the dining room still runs out of meals or drinks, rooms add workload before the base business is ready.",
      "When expanding seats, prepare an extra batch of both food and drinks first. If the added seats empty stock immediately, remove or delay the expansion.",
    ],
  },
  "mid-game": {
    "need-money": [
      "At mid game, stop judging profit by customer count alone. Check which station sits idle, which ingredient blocks brewing, and which aged batch is waiting too long before expanding again.",
      "Use staff coverage to create production time. If staff free you from service but you do not brew, cook, plant, or process during that time, wages are not improving the loop.",
      "Audit one drink chain from crop to keg to aging. Fix the slowest step before spending on a different chain that will hit the same bottleneck.",
    ],
    "what-to-cook": [
      "Split the menu into daily service food and high-value batch food. Daily food should be easy to refill; batch food can use rarer ingredients when the reserve is ready.",
      "If a recipe slows several stations, move it out of the everyday menu and make it only when ingredients and station time are already free.",
      "Use advanced dishes as planned batches, not random service filler. Prepare them before the day starts so they do not steal attention from basic refills.",
    ],
    "run-out-stock": [
      "Set a minimum number for each stock role, even if the number is only your own rough rule. Do not start a service if food, drinks, fuel, or room supplies are below that line.",
      "When staff reduce service work, spend the recovered time on the stock category that failed last week. More free time should become more batches, not just more open hours.",
      "Check whether rooms, board orders, and the main hall are all eating the same crop or processed ingredient. If they are, assign one use as priority before production begins.",
    ],
    "what-to-plant": [
      "Give each field section a fixed purpose for the next few harvests: staples, brewing, premium food, or reserve. Replanning every day makes storage harder to read.",
      "Do not replace all dependable crops with high-value seasonal crops. Keep enough basics planted so the tavern can still open if the seasonal plan disappoints.",
      "Use long-horizon crops only after short-term supply is covered. A slow investment does not help if tonight's kitchen is missing vegetables or drink inputs.",
    ],
    "too-busy": [
      "Walk the service route in your head before moving furniture: bar, tables, cleaning spots, storage, and rooms. If one route crosses everything, redesign before buying more seats.",
      "Use a bouncer when disruptive guests repeatedly pull attention away from service. If the problem is drinks or cleaning instead, choose staff or layout changes for that pressure.",
      "Separate room chores from hall chores as much as possible. Mid-game pressure often comes from two workflows sharing the same narrow path.",
    ],
    "need-reputation": [
      "Build one polished service cycle: premium stock ready, clean room, comfort pieces placed, staff assigned, and no experimental menu change during the same opening.",
      "Use VIP or high-quality days only when the pantry can absorb them. A reputation push should not leave tomorrow's normal service without ingredients.",
      "If reputation stalls, inspect the whole guest experience rather than adding seats: lighting, dirt, menu variety, drink quality, waiting time, and room comfort if rooms are active.",
    ],
    "staff-and-rooms": [
      "Before adding rooms, run a normal tavern day and note whether food, drinks, and cleaning still hold. If the hall struggles, rooms will multiply the same workload.",
      "Give each staff member a clear reason to exist. If two workers cover quiet jobs while drinks collapse, change tasks before hiring another person.",
      "Budget room furniture and comfort alongside meal and drink reserves. A furnished room that drains the main tavern can slow both income lines.",
    ],
  },
  "late-game": {
    "need-money": [
      "Late-game money comes from tightening the whole chain: premium inputs, batch timing, aging space, staff routes, and room demand. Pick one chain and remove its slowest step.",
      "Do not open longer just to chase more sales if staff and stock are already stretched. Improve batch size or service flow so the same hours sell better products.",
      "Review products that consume rare ingredients but sell slowly. Retire weak lines and move those ingredients into batches that reliably leave the counter.",
    ],
    "what-to-cook": [
      "Use late-game storage history to trim the menu. If a dish sits unsold or steals ingredients from better batches, remove it from regular service.",
      "Pair premium dishes with dependable base dishes so a failed premium batch does not leave the tavern without meals.",
      "Plan food and drinks together before rooms or events draw from the same pantry. Late-game menus fail when every system assumes the same reserve is available.",
    ],
    "run-out-stock": [
      "If late-game storage still empties, trace one missing item backward through field space, processing, aging, staff movement, and layout. The first blocked step is the real fix.",
      "Create batch days for major categories instead of topping up after every opening. Large taverns need scheduled production more than emergency crafting.",
      "Keep safety stock for ingredients used by rooms, board orders, and premium menu items. If three systems share one crop, that crop needs a protected reserve.",
    ],
    "what-to-plant": [
      "Divide the farm into permanent lanes: base cooking, drink production, premium seasonal crops, and long-term investments. Do not let one trend consume every plot.",
      "Protect staple crops even when premium crops look stronger. A late-game tavern still loses momentum if basic dishes, drinks, or room supplies run dry.",
      "Use saplings, tea-style crops, or other long-term plants as planned capacity, not emergency stock. Plant them when the current menu is already covered.",
    ],
    "too-busy": [
      "If late-game service feels chaotic, remove bad seats before adding help. A table that creates long walking routes can cost more attention than it earns.",
      "Tune staff by pressure: bartender for drink interruptions, bouncer for troublesome guests, housekeeper for room workload. Hiring without matching pressure just adds wages.",
      "Separate room traffic from hall service wherever the layout allows it. Shared paths make cleaning and refills feel worse as the tavern grows.",
    ],
    "need-reputation": [
      "Prepare reputation pushes like production projects: premium food ready, drinks aged or stocked, comfort placed, lighting checked, staff assigned, and no last-minute menu gamble.",
      "Do not trade service quality for crowd size. A smaller controlled opening with high-quality stock is better than a packed room that runs dirty and empty.",
      "Review comfort by area, not just total decoration. If rooms feel good but the hall path is crowded, or the hall looks good but rooms are neglected, reputation work becomes uneven.",
    ],
    "staff-and-rooms": [
      "Late-game expansion should solve a named bottleneck. If you cannot say whether the new room, staff member, or layout change fixes cleaning, service, stock, or comfort, wait.",
      "Reassign staff after every major layout or room change. A good old task setup can become wasteful once traffic, rooms, or drink demand shifts.",
      "Scale rooms only with the supplies behind them: furniture, comfort, cleaning time, food, drinks, and staff coverage. Room income is strongest when it does not cannibalize the hall.",
    ],
  },
} satisfies Record<StageId, Record<ProblemId, string[]>>;

const actionTitlesByProblem: Record<ProblemId, string[]> = {
  "need-money": [
    "Build a short prep loop before opening",
    "Turn available produce into sellable stock",
    "Run a controlled service test",
    "Spend coins where they restart production",
    "Keep progression tied to materials",
    "Check the slowest income step",
    "Protect tomorrow's production money",
    "Use supply runs to keep income alive",
  ],
  "what-to-cook": [
    "Keep the first menu small",
    "Test one recipe before expanding",
    "Remove ingredient conflicts early",
    "Choose recipes you can repeat",
    "Keep food from starving drinks",
    "Use the next harvest as your menu test",
    "Cut dishes that empty one ingredient",
    "Make surplus food temporary",
  ],
  "run-out-stock": [
    "Use a closed prep day when shelves are empty",
    "Build a gather-to-open rhythm",
    "Cut the menu until stock becomes readable",
    "Record the first broken stock category",
    "Keep a reserve instead of selling to zero",
    "Refill the category that stopped service",
    "Separate tavern stock from order stock",
    "Turn free time into replacement batches",
  ],
  "what-to-plant": [
    "Give every plot a job",
    "Plant around the next menu",
    "Use crop examples as tests, not rules",
    "Keep recurring crops for repeat service",
    "Protect seasonal ingredients before they vanish",
    "Keep a safe staple lane",
    "Match drink crops to station capacity",
    "Review harvests against actual sales",
  ],
  "too-busy": [
    "Stop adding seats after a chaotic day",
    "Shorten service before the room collapses",
    "Move supplies onto the service route",
    "Prepare before the door opens",
    "Treat shop growth as gradual pressure",
    "Count the task that interrupts you most",
    "Hire only for the real slowdown",
    "Fix the path before adding capacity",
  ],
  "need-reputation": [
    "Plan one clean service day",
    "Improve comfort after the loop works",
    "Check the whole guest experience",
    "Keep rating goals tied to supplies",
    "Fix the first reputation drag",
    "Prepare quality before chasing traffic",
    "Use variety only when stock can carry it",
    "Keep rooms and hall comfort balanced",
  ],
  "staff-and-rooms": [
    "Treat rooms as expansion, not rescue",
    "Hire for one time sink first",
    "Check stock before adding space",
    "Spend on production before lodging",
    "Match staff value to actual workload",
    "Review wages after the first hire",
    "Expand seats only after extra stock exists",
    "Keep lodging from cannibalizing the hall",
  ],
};

const stageDetails: Record<StageId, { label: string; situation: string; pacing: string }> = {
  "first-week": {
    label: "First Week",
    situation: "your tavern loop is still fragile and one bad opening can empty several categories at once",
    pacing: "Stop after one service test and adjust the next morning instead of adding another unlock immediately.",
  },
  "early-game": {
    label: "Early Game",
    situation: "basic production exists, but the tavern can still outgrow food, drink, or cleaning capacity",
    pacing: "Run the change for a few normal openings before you add seats, recipes, staff, or another production chain.",
  },
  "mid-game": {
    label: "Mid Game",
    situation: "several systems compete for the same crops, materials, staff time, and station slots",
    pacing: "Check the full chain after each adjustment, because the bottleneck may move from ingredients to processing, aging, staff, or layout.",
  },
  "late-game": {
    label: "Late Game",
    situation: "profit and reputation depend more on tuned production, staff routing, rooms, and premium stock than on simply opening longer",
    pacing: "Keep only the changes that improve a real bottleneck over several services, and retire lines that consume rare stock without helping the tavern.",
  },
};

function expandRecommendation(stageId: StageId, problemId: ProblemId): Recommendation {
  const seed = recommendationsByStageAndProblem[stageId][problemId];
  const notes = [...seed.actions, ...extraActionsByStageAndProblem[stageId][problemId]].slice(0, 8);

  return {
    title: seed.title,
    actions: notes.map((note, index) => expandAction(note, stageId, problemId, index)),
  };
}

function expandAction(note: string, stageId: StageId, problemId: ProblemId, index: number): ActionItem {
  const stage = stageDetails[stageId];
  const titles = actionTitlesByProblem[problemId];
  const title = titles[index] ?? `${stage.label} action ${index + 1}`;
  const cleanedNote = note.replace(/; /g, ". ");
  const sourceLogic =
    index % 3 === 0
      ? "That is the practical reason this pattern shows up in both English community advice and Japanese guide-style progression notes."
      : index % 3 === 1
        ? "The useful part of the community logic is not the exact item choice, but the habit of checking whether the next opening can repeat the result."
        : "Use it as a planning rule rather than a fixed build order, because balance and item values can change between updates.";

  return {
    title,
    body: `${cleanedNote} In ${stage.label.toLowerCase()}, this matters because ${stage.situation}. Apply it before the next opening, watch whether the same shortage or delay appears again, and use that result to decide whether to continue or pause; ${stage.pacing} ${sourceLogic}`,
  };
}

export function WhatToDoNextClient() {
  const [currentStage, setCurrentStage] = useState<StageId>("first-week");
  const [currentProblem, setCurrentProblem] = useState<ProblemId>("need-money");

  const recommendation = useMemo(() => expandRecommendation(currentStage, currentProblem), [currentProblem, currentStage]);
  const stageDescription = stages.find((stage) => stage.id === currentStage)?.description;

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="wood-panel rounded-lg p-5 lg:sticky lg:top-24 lg:self-start" aria-label="Decision inputs">
        <label className="block">
          <span className="text-sm font-bold text-amber-100">Current Stage</span>
          <select
            value={currentStage}
            onChange={(event) => setCurrentStage(event.target.value as StageId)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.label}
              </option>
            ))}
          </select>
          {stageDescription ? <span className="mt-2 block text-sm text-stone-400">{stageDescription}</span> : null}
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-amber-100">Main Problem</span>
          <select
            value={currentProblem}
            onChange={(event) => setCurrentProblem(event.target.value as ProblemId)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-lg border border-amber-200/18 bg-[#1a100b] p-5" aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Recommended Actions</p>
        <h2 className="mt-2 text-3xl font-black text-amber-50">{recommendation.title}</h2>
        <p className="mt-3 max-w-3xl text-stone-300">
          These actions summarize common player advice from English discussions, Japanese guide pages, and player notes. They avoid fixed prices or exact balance claims because the game changes over time.
        </p>
        <ol className="mt-6 grid gap-5 text-stone-300">
          {recommendation.actions.map((action, index) => (
            <li key={action.title} className="rounded border border-amber-200/12 bg-[#120c08]/70 p-5">
              <h3 className="text-lg font-bold text-amber-100">
                {index + 1}. {action.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">{action.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
