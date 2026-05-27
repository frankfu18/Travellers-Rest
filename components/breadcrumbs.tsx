import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ name: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-stone-300">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-amber-100">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-stone-500">
              /
            </span>
            <Link href={item.href} className="hover:text-amber-100">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
