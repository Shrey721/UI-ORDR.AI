import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function ParcelLayout({ activePage, onNavigate, searchQuery, onSearchChange, acceptingOrders, onToggleAcceptingOrders, prepTally, children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        prepTally={prepTally}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      {isMobileSidebarOpen ? (
        <button
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      ) : null}
      <main className="parcel-shell ml-64 flex h-screen flex-1 flex-col overflow-hidden">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          acceptingOrders={acceptingOrders}
          onToggleAcceptingOrders={onToggleAcceptingOrders}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <div className="mt-16 flex-1 overflow-y-auto p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default ParcelLayout;
