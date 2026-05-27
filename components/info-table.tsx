export function InfoTable({ rows }: { rows: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <section className="wood-panel rounded-lg p-5" aria-labelledby="info-table-heading">
      <h2 id="info-table-heading" className="text-base font-bold text-amber-100">
        Info
      </h2>
      <table className="wiki-table mt-3 text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td className="text-stone-200">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
