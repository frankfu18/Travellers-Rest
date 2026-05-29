import { formatDataStatus } from "@/lib/content";
import type { DatabaseEntry } from "@/types/content";

export function DataStatusBlock({ entry }: { entry: DatabaseEntry }) {
  const dateLabel = entry.dataStatus === "verified" ? "Last Verified:" : entry.dataStatus === "completed" ? "Last Reviewed:" : "Last Checked:";

  return (
    <section className="wood-panel rounded-lg p-5" aria-labelledby="data-status-heading">
      <h2 id="data-status-heading" className="text-base font-bold text-amber-100">
        Data Status
      </h2>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="font-bold text-amber-200">Data Status:</dt>
          <dd className="text-stone-200">{formatDataStatus(entry.dataStatus)}</dd>
        </div>
        <div>
          <dt className="font-bold text-amber-200">{dateLabel}</dt>
          <dd className="text-stone-200">{entry.lastChecked}</dd>
        </div>
        <div>
          <dt className="font-bold text-amber-200">Version Note:</dt>
          <dd className="text-stone-200">{entry.versionNote}</dd>
        </div>
        <div>
          <dt className="font-bold text-amber-200">Source Note:</dt>
          <dd className="text-stone-200">{entry.sourceNote}</dd>
        </div>
      </dl>
    </section>
  );
}
