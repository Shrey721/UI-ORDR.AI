import Icon from "../../components/common/Icon.jsx";

function TransitCard({ parcel, onMarkDelivered }) {
  const items = parcel.selectedItems ?? parcel.items;

  return (
    <div className="rounded-3xl border border-surface-container-highest bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-headline text-sm font-bold tracking-tight">{parcel.id}</span>
          <Icon name="local_shipping" className="text-sm text-secondary" />
        </div>
        <span className="text-[10px] font-bold text-on-surface-variant/40">DISPATCHED {parcel.dispatchedAt}</span>
      </div>

      <div className="mb-4 space-y-1">
        {items.map((item) => (
          <p key={item} className="text-sm font-medium text-on-surface">{item}</p>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button className="rounded-full bg-[#008542] px-6 py-2 text-xs font-bold text-white transition-all hover:brightness-110" type="button" onClick={() => onMarkDelivered(parcel.id)}>
          Mark Delivered
        </button>
      </div>
    </div>
  );
}

function InTransit({ searchQuery, transitOrders = [], onMarkDelivered, onRefresh, isRefreshing }) {
  const parcels = transitOrders.filter((parcel) =>
    `${parcel.id} ${parcel.dispatchedAt} ${parcel.items.join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">In Transit</h2>
          <span className="rounded-full bg-surface-container-highest px-3 py-1 text-sm text-on-surface-variant">{parcels.length}</span>
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container-highest px-3 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh In Transit"
        >
          <span className={`${isRefreshing ? "animate-spin" : ""}`}>
            <Icon name="refresh" className="text-base" />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {parcels.map((parcel) => (
          <TransitCard key={parcel.id} parcel={parcel} onMarkDelivered={onMarkDelivered} />
        ))}
      </div>

      {parcels.length === 0 ? (
        <div className="rounded-3xl border border-surface-container-highest bg-white p-8 text-center text-sm font-medium text-on-surface-variant shadow-sm">
          No in-transit parcels match your search.
        </div>
      ) : null}
    </div>
  );
}

export default InTransit;

