import Icon from "../common/Icon.jsx";
import { parcelNavItems } from "../../data/parcelData.js";

function Sidebar({ activePage, onNavigate, prepTally = [], isOpen = false, onClose }) {
  const showPrepTally = activePage === "dashboard" || activePage === "packing" || activePage === "inventory";

  return (
    <aside className={`parcel-sidebar fixed left-0 top-0 z-40 flex h-full w-64 flex-col overflow-y-auto border-r border-surface-container-highest bg-surface-variant pt-16 no-scrollbar ${isOpen ? "parcel-sidebar-open" : ""}`}>
      <div className="px-6 py-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">KH</div>
          <p className="text-sm font-bold text-on-surface">Kitchen Hub</p>
        </div>

        <nav className="space-y-1">
          <div className="flex flex-col gap-1 py-4">
            {parcelNavItems.map((item) => {
              const isActive = item.id === activePage;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose?.();
                  }}
                  className={`flex items-center gap-4 rounded-full px-6 py-3 text-left transition-all ${
                    isActive
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                      : "text-on-surface-variant hover:bg-surface-container-highest"
                  }`}
                >
                  <Icon name={item.icon} className="text-2xl" />
                  <span className={`font-headline text-sm ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {showPrepTally ? (
            <div className="mt-6 border-t border-surface-container-highest/50 pt-6">
              <div className="rounded-2xl border border-surface-container-highest bg-white p-4 shadow-sm">
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Live Prep Tally</p>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-surface-container-highest/30">
                  {prepTally.length > 0 ? prepTally.map((row) => (
                    <tr key={row.item}>
                      <td className="py-2 font-medium text-on-surface-variant">{row.item}</td>
                      <td className="border-l border-surface-container-highest/30 py-2 pl-3 text-right font-bold text-primary">{row.count}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="py-2 font-medium text-on-surface-variant" colSpan="2">No active prep</td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </nav>
      </div>

      <div className="mt-auto border-t border-surface-container-highest px-6 py-8">
        <button className="mx-2 flex items-center gap-3 rounded-full px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-highest" type="button">
          <Icon name="logout" />
          <span className="font-headline text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
