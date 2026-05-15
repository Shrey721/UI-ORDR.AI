import { useMemo, useState } from "react";
import Icon from "../../components/common/Icon.jsx";

const inventoryFilters = ["All", "Breakfast", "Main Course", "Sides & Breads", "Beverages"];

function SmallToggle({ checked, onChange, label }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center" aria-label={label}>
      <input className="peer sr-only" checked={checked} onChange={onChange} type="checkbox" />
      <div className="peer h-6 w-11 rounded-full bg-surface-container-highest after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-surface-container-highest after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}

function PackingCard({ order, onMarkShipped }) {
  return (
    <div className="rounded-3xl border border-surface-container-highest bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <span className="font-headline text-sm font-bold tracking-tight text-on-surface">{order.id}</span>
        {order.delayed ? (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-black uppercase text-primary">Delayed</span>
        ) : (
          <span className="rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">Normal</span>
        )}
      </div>

      <div className="mb-4 space-y-1">
        {order.items.map((item) => (
          <p key={item} className="text-sm font-medium text-on-surface">{item}</p>
        ))}
        {order.addOns ? <p className="font-body text-[11px] text-on-surface-variant">Add-ons: {order.addOns}</p> : null}
      </div>

      {order.delayed ? (
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <div className="h-full bg-primary" style={{ width: `${order.progress}%` }} />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        {order.delayed ? (
          <div className="flex items-center gap-1.5 text-primary">
            <Icon name="schedule" className="text-sm" />
            <span className="font-headline text-xs font-bold">Time Up: {order.elapsed.replace(" (Time Up)", "")}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Icon name="schedule" className="text-sm" />
            <span className="font-headline text-xs font-bold">{order.elapsed}</span>
          </div>
        )}
        <button className="rounded-full bg-primary px-6 py-2 text-xs font-bold text-on-primary transition-all hover:brightness-110" type="button" onClick={() => onMarkShipped(order.id)}>
          Mark Shipped
        </button>
      </div>

      {!order.delayed ? (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface-variant">
          <Icon name="event_available" className="text-sm" />
          Pack by {order.packBy}
        </div>
      ) : null}
    </div>
  );
}

function TransitCard({ order, onMarkDelivered }) {
  return (
    <div className="rounded-3xl border border-surface-container-highest bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-headline text-sm font-bold tracking-tight">{order.id}</span>
          <Icon name="local_shipping" className="text-sm text-secondary" />
        </div>
        <span className="text-[10px] font-bold text-on-surface-variant/40">DISPATCHED {order.dispatchedAt}</span>
      </div>
      <div className="mb-4 space-y-1">
        {order.items.map((item) => (
          <p key={item} className="text-sm font-medium text-on-surface">{item}</p>
        ))}
      </div>
      <button className="rounded-full bg-[#008542] px-6 py-2 text-xs font-bold text-white transition-all hover:brightness-110" type="button" onClick={() => onMarkDelivered(order.id)}>
        Mark Delivered
      </button>
    </div>
  );
}

function DeliveredCard({ order }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-surface-container-highest bg-white/60 p-4 opacity-80 grayscale">
      <div>
        <p className="font-headline text-xs font-bold text-on-surface">{order.id}</p>
        <p className="font-body text-[10px] text-on-surface-variant/60">{order.itemCount} Items - Complete</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-secondary">DELIVERED</p>
        <p className="font-body text-[10px] text-on-surface-variant/60">{order.deliveredAt}</p>
      </div>
    </div>
  );
}

function BoardColumn({ title, count, children }) {
  return (
    <section className="flex min-w-[320px] flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between px-2">
        <h2 className="flex items-center gap-2 font-headline text-lg font-extrabold tracking-tight text-on-surface">
          {title}
          <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-xs text-on-surface-variant">{count}</span>
        </h2>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pb-6 no-scrollbar">{children}</div>
    </section>
  );
}

function InventoryControl({ items = [], onToggleItem }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => filter === "All" || item.category === filter)
      .filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 8);
  }, [filter, items, search]);

  return (
    <aside className="w-80 flex-col overflow-y-auto border-l border-surface-container-highest bg-surface p-6 no-scrollbar hidden xl:flex">
      <div className="mb-8">
        <h3 className="font-headline mb-2 text-xl font-extrabold text-on-surface">Inventory Control</h3>
        <p className="font-body text-xs leading-relaxed text-on-surface-variant">Quickly toggle item availability to stop incoming orders for out-of-stock dishes.</p>
      </div>

      <div className="mb-4 flex items-center rounded-full border border-surface-container-highest bg-surface-container px-4 py-2 shadow-sm">
        <Icon name="search" className="mr-2 text-lg text-on-surface-variant/40" />
        <input
          className="w-full border-none bg-transparent p-0 text-xs font-body placeholder:text-on-surface-variant/40 focus:ring-0"
          placeholder="Search items..."
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {inventoryFilters.map((currentFilter) => (
          <button
            key={currentFilter}
            className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition-colors ${
              filter === currentFilter
                ? "bg-primary text-on-primary"
                : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
            }`}
            type="button"
            onClick={() => setFilter(currentFilter)}
          >
            {currentFilter === "Main Course" ? "Lunch" : currentFilter === "Sides & Breads" ? "Dinner" : currentFilter}
          </button>
        ))}
      </div>

      <p className="font-headline mb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Popular Items</p>
      <div className="flex flex-col gap-2">
        {filteredItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-surface-container-highest bg-white p-4">
            <span className="font-headline text-sm font-bold">{item.name}</span>
            <SmallToggle checked={item.available} onChange={() => onToggleItem(item.id)} label={`Toggle ${item.name}`} />
          </div>
        ))}
      </div>
    </aside>
  );
}

function ParcelDashboard({
  searchQuery,
  packingOrders = [],
  transitOrders = [],
  deliveredOrders = [],
  onMarkShipped,
  onMarkDelivered,
  onRefresh,
  isRefreshing,
  items = [],
  onToggleItem
}) {
  const query = searchQuery.toLowerCase();
  const visiblePacking = packingOrders
    .filter((order) => `${order.id} ${order.items.join(" ")}`.toLowerCase().includes(query))
    .sort((a, b) => Number(b.delayed) - Number(a.delayed) || a.id.localeCompare(b.id));
  const visibleTransit = transitOrders.filter((order) => `${order.id} ${order.items.join(" ")}`.toLowerCase().includes(query));
  const visibleDelivered = deliveredOrders.filter((order) => order.id.toLowerCase().includes(query));

  return (
    <div className="-m-6 flex h-[calc(100vh-4rem)] overflow-hidden lg:-m-8">
      <div className="flex-1 overflow-x-auto bg-surface p-6 no-scrollbar">
        <div className="mb-6 flex items-center justify-end px-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container-highest px-3 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh Live Orders"
          >
            <span className={`${isRefreshing ? "animate-spin" : ""}`}>
              <Icon name="refresh" className="text-base" />
            </span>
          </button>
        </div>
        <div className="flex h-full min-w-[1000px] gap-6">
          <BoardColumn title="Kitchen / Packing" count={visiblePacking.length}>
            {visiblePacking.map((order) => (
              <PackingCard key={order.id} order={order} onMarkShipped={onMarkShipped} />
            ))}
          </BoardColumn>

          <BoardColumn title="In Transit" count={visibleTransit.length}>
            {visibleTransit.map((order) => (
              <TransitCard key={order.id} order={order} onMarkDelivered={onMarkDelivered} />
            ))}
          </BoardColumn>

          <BoardColumn title="Delivered" count={`${visibleDelivered.length} today`}>
            {visibleDelivered.map((order) => (
              <DeliveredCard key={`${order.id}-${order.deliveredAt}`} order={order} />
            ))}
          </BoardColumn>
        </div>
      </div>

      <InventoryControl items={items} onToggleItem={onToggleItem} />
    </div>
  );
}

export default ParcelDashboard;
