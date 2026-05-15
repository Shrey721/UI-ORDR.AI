import { useEffect, useMemo, useState } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import ConfirmDialog from "./components/common/ConfirmDialog.jsx";
import ParcelLayout from "./components/layout/ParcelLayout.jsx";
import ParcelDashboard from "./pages/parcel-manager/ParcelDashboard.jsx";
import PackingDispatch from "./pages/parcel-manager/PackingDispatch.jsx";
import InTransit from "./pages/parcel-manager/InTransit.jsx";
import Inventory from "./pages/parcel-manager/Inventory.jsx";
import { inventoryItems, packingJobs, transitParcels } from "./data/parcelData.js";

const pages = {
  dashboard: ParcelDashboard,
  packing: PackingDispatch,
  transit: InTransit,
  inventory: Inventory
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isPageRefreshing, setIsPageRefreshing] = useState(false);
  const [menuItems, setMenuItems] = useState(inventoryItems);
  const [packingOrders, setPackingOrders] = useState(packingJobs);
  const [transitOrders, setTransitOrders] = useState(transitParcels);
  const [deliveredOrders, setDeliveredOrders] = useState([
    { id: "#ORD-9015", itemCount: 4, deliveredAt: "08:15 AM" },
    { id: "#ORD-9012", itemCount: 2, deliveredAt: "07:55 AM" },
    { id: "#ORD-9008", itemCount: 1, deliveredAt: "07:32 AM" }
  ]);
  const [shipmentOrder, setShipmentOrder] = useState(null);
  const [shipmentSelection, setShipmentSelection] = useState({});
  const [isShipmentProcessing, setIsShipmentProcessing] = useState(false);

  const ActivePage = useMemo(() => pages[activePage] || ParcelDashboard, [activePage]);

  useEffect(() => {
    setIsLoadingPage(true);
    const timeout = window.setTimeout(() => setIsLoadingPage(false), 220);
    return () => window.clearTimeout(timeout);
  }, [activePage]);
  const prepTally = useMemo(() => {
    const tally = new Map();

    packingOrders.forEach((order) => {
      order.items.forEach((lineItem) => {
        const match = lineItem.match(/^(\d+)x\s+(.+)$/i);
        const count = match ? Number(match[1]) : 1;
        const name = match ? match[2] : lineItem;
        tally.set(name, (tally.get(name) || 0) + count);
      });
    });

    return Array.from(tally, ([item, count]) => ({ item, count })).slice(0, 6);
  }, [packingOrders]);

  function requestMarkShipped(orderId) {
    const order = packingOrders.find((currentOrder) => currentOrder.id === orderId);
    if (!order) return;

    setShipmentOrder(order);
    setShipmentSelection(Object.fromEntries(order.items.map((item) => [item, true])));
  }

  function confirmMarkShipped() {
    if (!shipmentOrder) return;
    const selectedItems = shipmentOrder.items.filter((item) => shipmentSelection[item]);
    if (selectedItems.length === 0) return;

    setIsShipmentProcessing(true);
    window.setTimeout(() => {
      setPackingOrders((currentOrders) => currentOrders.filter((currentOrder) => currentOrder.id !== shipmentOrder.id));
      setTransitOrders((currentOrders) => [
        {
          id: shipmentOrder.id,
          dispatchedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          items: selectedItems,
          selectedItems
        },
        ...currentOrders
      ]);
      setShipmentOrder(null);
      setShipmentSelection({});
      setIsShipmentProcessing(false);
    }, 250);
  }

  function cancelShipment() {
    setShipmentOrder(null);
    setShipmentSelection({});
  }

  function markDelivered(orderId) {
    const order = transitOrders.find((currentOrder) => currentOrder.id === orderId);
    if (!order) return;

    const items = order.selectedItems ?? order.items;
    setTransitOrders((currentOrders) => currentOrders.filter((currentOrder) => currentOrder.id !== orderId));
    setDeliveredOrders((currentOrders) => [
      {
        id: order.id,
        itemCount: items.length,
        deliveredAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      },
      ...currentOrders
    ]);
  }

  function refreshPage() {
    if (isPageRefreshing) return;
    setIsPageRefreshing(true);

    setPackingOrders((current) => current.map((order) => ({ ...order, items: [...order.items] })));
    setTransitOrders((current) => current.map((order) => ({ ...order, items: [...order.items], selectedItems: order.selectedItems ? [...order.selectedItems] : undefined })));
    setMenuItems((current) => current.map((item) => ({ ...item })));

    window.setTimeout(() => {
      setIsPageRefreshing(false);
    }, 360);
  }

  return (
    <ParcelLayout
      activePage={activePage}
      onNavigate={setActivePage}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      acceptingOrders={acceptingOrders}
      onToggleAcceptingOrders={() => setAcceptingOrders((current) => !current)}
      prepTally={prepTally}
    >
      <ErrorBoundary>
        {isLoadingPage ? (
          <div className="grid gap-4 md:grid-cols-3" aria-live="polite" aria-busy="true">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 animate-pulse rounded-3xl border border-surface-container-highest bg-white" />
            ))}
          </div>
        ) : (
          <>
            <ActivePage
              searchQuery={searchQuery}
              packingOrders={packingOrders}
              transitOrders={transitOrders}
              deliveredOrders={deliveredOrders}
              onMarkShipped={requestMarkShipped}
              onMarkDelivered={markDelivered}
              onRefresh={refreshPage}
              isRefreshing={isPageRefreshing}
              items={menuItems}
              onToggleItem={(itemId) =>
                setMenuItems((currentItems) =>
                  currentItems.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item))
                )
              }
            />
            <ConfirmDialog
              open={Boolean(shipmentOrder)}
              title="Confirm shipment"
              description={shipmentOrder ? `Order ${shipmentOrder.id}` : undefined}
              confirmLabel="Mark Shipped"
              onCancel={cancelShipment}
              onConfirm={confirmMarkShipped}
              confirmDisabled={
                !shipmentOrder || Object.values(shipmentSelection).filter(Boolean).length === 0
              }
              isProcessing={isShipmentProcessing}
            >
              {shipmentOrder ? (
                <div className="space-y-4">
                  <p className="text-sm text-on-surface-variant">Review and select the items you want to ship.</p>
                  <div className="space-y-3 rounded-3xl border border-surface-container-highest bg-surface-container px-4 py-4">
                    {shipmentOrder.items.map((item, index) => (
                      <label key={`${item}-${index}`} className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-all hover:bg-surface-container-highest">
                        <input
                          type="checkbox"
                          checked={Boolean(shipmentSelection[item])}
                          onChange={() =>
                            setShipmentSelection((current) => ({ ...current, [item]: !current[item] }))
                          }
                          className="h-4 w-4 rounded border border-surface-container-highest text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-on-surface">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}
            </ConfirmDialog>
          </>
        )}
      </ErrorBoundary>
    </ParcelLayout>
  );
}

export default App;
