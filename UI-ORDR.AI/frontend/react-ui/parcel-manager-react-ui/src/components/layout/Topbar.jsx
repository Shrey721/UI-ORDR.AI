import { useState } from "react";
import Icon from "../common/Icon.jsx";

function Topbar({ searchQuery, onSearchChange, acceptingOrders, onToggleAcceptingOrders, onMenuClick }) {
  const statusLabel = acceptingOrders ? "Accepting Orders" : "Paused Orders";
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signup, setSignup] = useState({ restaurant: "", email: "" });
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const restaurantError = signupSubmitted && signup.restaurant.trim().length < 2;
  const emailError = signupSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email);

  function submitSignup(event) {
    event.preventDefault();
    setSignupSubmitted(true);
    setSignupComplete(false);

    if (signup.restaurant.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) {
      setSignupComplete(true);
    }
  }

  return (
    <header className="parcel-header fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-surface/80 px-6 py-3 backdrop-blur-xl">
      <div className="flex w-1/4 items-center">
        <button className="mr-3 rounded-full p-2 text-on-surface-variant hover:bg-white lg:hidden" type="button" aria-label="Open navigation" onClick={onMenuClick}>
          <Icon name="menu" />
        </button>
        <a href="https://ordrai.in" target="_blank" rel="noreferrer" aria-label="Open ORDR.ai website">
          <img className="h-10 w-auto object-contain" src="/assets/ordr-ai-logo.png" alt="ORDR.ai" />
        </a>
      </div>

      <div className="hidden flex-1 justify-center px-8 md:flex">
        <label className="flex w-full max-w-2xl items-center rounded-full border border-surface-container-highest bg-white px-6 py-2.5 shadow-sm">
          <Icon name="search" className="mr-3 text-xl text-on-surface-variant" />
          <input
            className="w-full border-none bg-transparent text-sm font-body placeholder:text-on-surface-variant/40 focus:ring-0"
            placeholder="Search orders, or menu items..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            type="search"
          />
        </label>
      </div>

      <div className="flex w-1/4 items-center justify-end gap-6">
        <div className="flex items-center gap-3 rounded-full border border-surface-container-highest bg-surface-container-lowest px-4 py-2">
          <div className={`h-2.5 w-2.5 rounded-full ${acceptingOrders ? "animate-pulse bg-[#10b981]" : "bg-error"}`} />
          <span className="font-headline text-xs font-bold tracking-tight text-on-surface">{statusLabel}</span>
          <button
            className={`relative flex h-5 w-10 items-center rounded-full px-0.5 transition-colors ${acceptingOrders ? "bg-[#064e3b]" : "bg-surface-container-highest"}`}
            type="button"
            aria-label="Toggle accepting orders"
            aria-pressed={acceptingOrders}
            onClick={onToggleAcceptingOrders}
          >
            <div className={`h-4 w-4 rounded-full bg-white transition-transform ${acceptingOrders ? "ml-auto" : ""}`} />
          </button>
        </div>
        <div className="relative flex items-center gap-4 text-on-surface-variant">
          <button
            className="relative transition-colors hover:text-primary"
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((isOpen) => !isOpen)}
          >
            <Icon name="notifications" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
          </button>
          <a className="transition-colors hover:text-primary" href="https://ordrai.in" target="_blank" rel="noreferrer" aria-label="Support">
            <Icon name="help" />
          </a>
          <button
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-surface-container-highest shadow-sm transition-colors hover:text-primary"
            type="button"
            aria-label="Open sign up"
            aria-expanded={showSignup}
            onClick={() => setShowSignup((isOpen) => !isOpen)}
          >
            <Icon name="account_circle" className="text-xl text-on-surface-variant" />
          </button>

          {showNotifications ? (
            <div className="absolute right-10 top-10 w-72 rounded-3xl border border-surface-container-highest bg-white p-4 text-on-surface shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-headline text-sm font-black">Notifications</p>
                <span className="rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-bold text-primary">2 new</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="rounded-2xl bg-surface-container p-3">
                  <p className="font-bold">#ORD-9021 is delayed</p>
                  <p className="mt-1 text-on-surface-variant">Kitchen timer needs attention.</p>
                </div>
                <div className="rounded-2xl bg-surface-container p-3">
                  <p className="font-bold">Samosa is out of stock</p>
                  <p className="mt-1 text-on-surface-variant">Inventory toggle is currently off.</p>
                </div>
              </div>
            </div>
          ) : null}

          {showSignup ? (
            <div className="absolute right-0 top-10 w-80 rounded-3xl border border-surface-container-highest bg-white p-4 text-on-surface shadow-xl">
              <p className="font-headline text-base font-black">Sign up</p>
              <p className="mt-1 text-xs text-on-surface-variant">Create an ORDR.ai workspace account.</p>
              <form className="mt-4 space-y-3" noValidate onSubmit={submitSignup}>
                <div>
                  <label className="sr-only" htmlFor="restaurant-name">Restaurant name</label>
                  <input
                    id="restaurant-name"
                    className={`w-full rounded-2xl border bg-surface-container px-4 py-2 text-sm focus:border-primary focus:ring-primary/20 ${restaurantError ? "border-error" : "border-surface-container-highest"}`}
                    placeholder="Restaurant name"
                    type="text"
                    value={signup.restaurant}
                    onChange={(event) => setSignup((current) => ({ ...current, restaurant: event.target.value }))}
                    aria-invalid={restaurantError}
                    aria-describedby={restaurantError ? "restaurant-error" : undefined}
                  />
                  {restaurantError ? <p className="mt-1 text-xs font-medium text-error" id="restaurant-error">Enter at least 2 characters.</p> : null}
                </div>
                <div>
                  <label className="sr-only" htmlFor="signup-email">Email address</label>
                  <input
                    id="signup-email"
                    className={`w-full rounded-2xl border bg-surface-container px-4 py-2 text-sm focus:border-primary focus:ring-primary/20 ${emailError ? "border-error" : "border-surface-container-highest"}`}
                    placeholder="Email address"
                    type="email"
                    value={signup.email}
                    onChange={(event) => setSignup((current) => ({ ...current, email: event.target.value }))}
                    aria-invalid={emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError ? <p className="mt-1 text-xs font-medium text-error" id="email-error">Enter a valid email address.</p> : null}
                </div>
                <button className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-on-primary" type="submit">
                  Continue
                </button>
                {signupComplete ? <p className="text-xs font-bold text-secondary" role="status">Sign-up details look good.</p> : null}
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Topbar;

