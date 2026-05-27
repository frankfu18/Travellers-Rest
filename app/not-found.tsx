import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">404</p>
      <h1 className="mt-3 text-4xl font-black text-amber-50">Page not found</h1>
      <p className="mt-4 text-stone-300">This guide page is not in the static dataset yet.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded border border-amber-200/30 bg-amber-300 px-5 py-3 font-bold text-stone-950 hover:bg-amber-200"
      >
        Back to home
      </Link>
    </main>
  );
}
