export function SearchBox() {
  return (
    <form className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row" role="search">
      <label htmlFor="site-search" className="sr-only">
        Search Travellers Rest guides
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder="Search recipes, ingredients, crops, NPCs..."
        className="min-h-12 flex-1 rounded border border-amber-200/25 bg-[#120c08]/90 px-4 text-base text-amber-50 outline-none ring-0 placeholder:text-stone-400 focus:border-amber-200/60"
      />
      <button
        type="submit"
        className="min-h-12 rounded border border-amber-200/35 bg-amber-300 px-5 font-bold text-stone-950 hover:bg-amber-200"
      >
        Search
      </button>
    </form>
  );
}
