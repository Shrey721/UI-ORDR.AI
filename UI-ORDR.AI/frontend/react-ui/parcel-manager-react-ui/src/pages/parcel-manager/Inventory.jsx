import { useMemo, useState } from "react";
import Icon from "../../components/common/Icon.jsx";

const filters = ["All Items", "Breakfast", "Main Course", "Sides & Breads", "Beverages", "Out of Stock"];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center" aria-label={label}>
      <input className="peer sr-only" checked={checked} onChange={onChange} type="checkbox" />
      <div className="peer h-7 w-14 rounded-full bg-surface-container-highest transition-all after:absolute after:left-[4px] after:top-[4px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-surface-container-highest after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/10" />
    </label>
  );
}

function FilterButton({ filter, count, active, onClick }) {
  return (
    <button
      className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm transition-colors ${
        active
          ? "bg-primary font-bold text-on-primary"
          : "border border-surface-container-highest bg-surface-container-lowest font-medium text-on-surface-variant hover:bg-surface-container-high"
      }`}
      type="button"
      onClick={onClick}
    >
      {filter === "All Items" ? `${filter} (${count})` : filter}
    </button>
  );
}

function InventoryItem({ item, onToggleItem }) {
  return (
    <div className="group flex items-center justify-between rounded-[2rem] border border-surface-container-highest bg-white p-5 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div>
          <h4 className="font-headline text-base font-bold text-on-surface">{item.name}</h4>
          <p className="text-xs font-medium text-on-surface-variant/60">{item.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${
            item.available ? "text-secondary opacity-0 group-hover:opacity-100" : "text-error opacity-100"
          }`}
        >
          {item.available ? "Available" : "Out of Stock"}
        </span>
        <Toggle checked={item.available} onChange={() => onToggleItem(item.id)} label={`Toggle ${item.name}`} />
      </div>
    </div>
  );
}

function QuickStats({ totalItems, outOfStock }) {
  return (
    <aside className="hidden w-80 flex-col overflow-y-auto p-6 no-scrollbar xl:flex">
      <div className="mb-8">
        <h3 className="font-headline mb-2 text-xl font-extrabold text-on-surface">Quick Stats</h3>
        <p className="font-body text-xs leading-relaxed text-on-surface-variant">System-wide inventory health and stock alerts.</p>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl border border-surface-container-highest bg-surface-container-lowest p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Out of Stock</p>
          <div className="flex items-center justify-between">
            <span className="font-headline text-2xl font-bold">{String(outOfStock).padStart(2, "0")}</span>
            <Icon name="warning" className="text-error" />
          </div>
        </div>
        <div className="rounded-3xl border border-surface-container-highest bg-surface-container-lowest p-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Total Items</p>
          <div className="flex items-center justify-between">
            <span className="font-headline text-2xl font-bold">{totalItems}</span>
            <Icon name="inventory" className="text-primary" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Inventory({ searchQuery, items = [], onToggleItem, onRefresh, isRefreshing }) {
  const [localSearch, setLocalSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Items");

  const outOfStock = items.filter((item) => !item.available).length;
  const combinedSearch = `${searchQuery} ${localSearch}`.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesText = `${item.name} ${item.category}`.toLowerCase().includes(combinedSearch);
      const matchesFilter =
        activeFilter === "All Items" ||
        (activeFilter === "Out of Stock" ? !item.available : item.category === activeFilter);

      return matchesText && matchesFilter;
    });
  }, [activeFilter, combinedSearch, items]);

  return (
    <div className="-m-6 flex min-h-[calc(100vh-4rem)] overflow-hidden bg-[#f9f1ee] lg:-m-8">
      <div className="flex-1 overflow-y-auto border-r border-surface-container-highest p-6 no-scrollbar">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Inventory Management</h1>
                <p className="mt-1 text-sm text-on-surface-variant">Manage global availability of your menu items</p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container-highest px-3 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="Refresh Inventory"
              >
                <span className={`${isRefreshing ? "animate-spin" : ""}`}>
                  <Icon name="refresh" className="text-base" />
                </span>
              </button>
            </div>

            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
                <Icon name="search" className="text-on-surface-variant/60 transition-colors group-focus-within:text-primary" />
              </div>
              <input
                className="block w-full rounded-3xl border-2 border-surface-container-highest bg-surface-container-lowest py-5 pl-14 pr-6 text-lg font-medium transition-all placeholder:text-on-surface-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="Search item name or category "
                type="search"
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  filter={filter}
                  count={items.length}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredItems.map((item) => (
                <InventoryItem key={item.id} item={item} onToggleItem={onToggleItem} />
              ))}
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-[2rem] border border-surface-container-highest bg-surface-container-lowest p-8 text-center text-sm font-medium text-on-surface-variant">
                No inventory items match this filter.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <QuickStats totalItems={items.length} outOfStock={outOfStock} />
    </div>
  );
}

export default Inventory;
