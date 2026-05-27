export function TableOfContents({ items }: { items: Array<{ id: string; title: string }> }) {
  return (
    <aside className="wood-panel rounded-lg p-5">
      <h2 className="text-base font-bold text-amber-100">Contents</h2>
      <ol className="mt-3 space-y-2 text-sm text-stone-300">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="hover:text-amber-100">
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
