import Icon from "../../components/common/Icon.jsx";

function PackingCard({ job, onMarkShipped }) {
  return (
    <div className="rounded-3xl border border-surface-container-highest bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <span className="font-headline text-sm font-bold tracking-tight text-on-surface">{job.id}</span>
        {job.delayed ? (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-black uppercase text-primary">Delayed</span>
        ) : (
          <span className="rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">&nbsp;</span>
        )}
      </div>

      <div className="mb-4 space-y-1">
        {job.items.map((item) => (
          <p key={item} className="text-sm font-medium text-on-surface">{item}</p>
        ))}
        {job.addOns ? <p className="font-body text-[11px] text-on-surface-variant">Add-ons: {job.addOns}</p> : null}
      </div>

      {job.delayed ? (
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <div className="h-full bg-primary" style={{ width: `${job.progress}%` }} />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        {job.delayed ? (
          <div className="flex min-w-0 items-center gap-1.5 text-primary">
            <Icon name="schedule" className="text-sm" />
            <span className="font-headline text-xs font-bold">Time Up: {job.elapsed.replace(" (Time Up)", "")}</span>
          </div>
        ) : (
          <div className="flex min-w-0 items-center gap-1.5 text-on-surface-variant">
            <Icon name="schedule" className="text-sm" />
            <span className="font-headline text-xs font-bold">{job.elapsed}</span>
          </div>
        )}
        <button className="shrink-0 rounded-full bg-primary px-6 py-2 text-xs font-bold text-on-primary transition-all hover:brightness-110" type="button" onClick={() => onMarkShipped(job.id)}>
          Mark Shipped
        </button>
      </div>

      {!job.delayed ? (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface-variant">
          <Icon name="event_available" className="text-sm" />
          Pack by {job.packBy}
        </div>
      ) : null}
    </div>
  );
}

function PackingDispatch({ searchQuery, packingOrders = [], onMarkShipped, onRefresh, isRefreshing }) {
  const jobs = packingOrders
    .filter((job) =>
      `${job.id} ${job.elapsed} ${job.packBy || ""} ${job.items.join(" ")} ${job.addOns || ""}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => Number(b.delayed) - Number(a.delayed) || a.id.localeCompare(b.id));

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Kitchen / Packing</h2>
          <span className="rounded-full bg-surface-container-highest px-3 py-1 text-sm text-on-surface-variant">{jobs.length}</span>
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container-highest px-3 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh Kitchen / Packing"
        >
          <span className={`${isRefreshing ? "animate-spin" : ""}`}>
            <Icon name="refresh" className="text-base" />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <PackingCard key={job.id} job={job} onMarkShipped={onMarkShipped} />
        ))}
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-3xl border border-surface-container-highest bg-white p-8 text-center text-sm font-medium text-on-surface-variant shadow-sm">
          No kitchen or packing orders match your search.
        </div>
      ) : null}
    </div>
  );
}

export default PackingDispatch;
