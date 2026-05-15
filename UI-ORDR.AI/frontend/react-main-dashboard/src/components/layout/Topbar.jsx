import React, { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'

export default function Topbar({ onSearch, onNotifications = null, acceptingOrders = true, onToggleAcceptingOrders = null }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const notificationsRef = useRef(null)
  const helpRef = useRef(null)
  const profileRef = useRef(null)
  const notificationsFirstRef = useRef(null)
  const helpFirstRef = useRef(null)
  const profileFirstRef = useRef(null)

  const notifications = [
    { id: 1, title: '3 orders delayed', detail: 'Kitchen queue needs attention', unread: true },
    { id: 2, title: 'Payout processed', detail: 'Today 11:42 AM', unread: false },
    { id: 3, title: 'Menu sync complete', detail: '24 items updated', unread: false },
  ]

  useEffect(() => {
    const onOutsideClick = (event) => {
      const target = event.target

      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false)
      }
      if (helpRef.current && !helpRef.current.contains(target)) {
        setHelpOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setNotificationsOpen(false)
        setHelpOpen(false)
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', onOutsideClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutsideClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const toggleNotifications = () => {
    setNotificationsOpen((open) => !open)
    setHelpOpen(false)
    setProfileOpen(false)
    onNotifications?.()
  }

  const toggleHelp = () => {
    setHelpOpen((open) => !open)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  const toggleProfile = () => {
    setProfileOpen((open) => !open)
    setNotificationsOpen(false)
    setHelpOpen(false)
  }

  useEffect(() => {
    if (notificationsOpen) {
      // focus first notification item
      setTimeout(() => notificationsFirstRef.current?.focus(), 0)
    }
  }, [notificationsOpen])

  useEffect(() => {
    if (helpOpen) {
      setTimeout(() => helpFirstRef.current?.focus(), 0)
    }
  }, [helpOpen])

  useEffect(() => {
    if (profileOpen) {
      setTimeout(() => profileFirstRef.current?.focus(), 0)
    }
  }, [profileOpen])

  const handleAuthAction = () => {
    setIsLoggedIn((state) => !state)
    setProfileOpen(false)
  }

  return (
    <header className="fixed top-0 left-64 right-0 z-30 flex h-16 items-center justify-between bg-surface/80 px-6 py-3 backdrop-blur-xl">
      {/* Search Bar */}
      <div className="hidden flex-1 justify-center px-8 md:flex">
        <div className="relative w-full max-w-2xl">
          <Icon name="search" className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input
            type="text"
            placeholder="Search orders, or menu items..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full rounded-full border border-surface-container-highest bg-white px-6 py-2.5 pl-12 text-sm font-body text-on-surface shadow-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center justify-end gap-6">
        {onToggleAcceptingOrders ? (
          <div className="flex items-center gap-3 rounded-full border border-surface-container-highest bg-surface-container-lowest px-4 py-2">
            <div className={`h-2.5 w-2.5 rounded-full ${acceptingOrders ? 'animate-pulse bg-secondary' : 'bg-error'}`} />
            <span className="font-headline text-xs font-bold tracking-tight text-on-surface">
              {acceptingOrders ? 'Accepting Orders' : 'Paused Orders'}
            </span>
            <button
              className={`relative flex h-5 w-10 items-center rounded-full px-0.5 transition-colors ${acceptingOrders ? 'bg-secondary' : 'bg-surface-container-highest'}`}
              type="button"
              aria-label="Toggle accepting orders"
              aria-pressed={acceptingOrders}
              onClick={onToggleAcceptingOrders}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${acceptingOrders ? 'ml-auto' : ''}`} />
            </button>
          </div>
        ) : null}

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            className="relative transition-colors hover:text-primary"
            title="Notifications"
            onClick={toggleNotifications}
          >
            <Icon name="notifications_none" size={24} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-3xl border border-surface-container-highest bg-white p-4 text-on-surface shadow-xl" role="menu" aria-label="Notifications Menu">
              <div className="px-1 pb-2">
                <p className="text-sm font-bold text-on-surface">Notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2 py-1">
                {notifications.map((item, idx) => (
                  <button
                    key={item.id}
                    ref={idx === 0 ? notificationsFirstRef : null}
                    role="menuitem"
                    className="w-full rounded-2xl bg-surface-container p-3 text-left transition-colors hover:bg-surface-container-high"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click()
                    }}
                  >
                    <div className="flex items-start gap-2">
                      {item.unread ? <span className="w-2 h-2 rounded-full bg-primary mt-1.5" /> : <span className="w-2 h-2 rounded-full bg-outline-variant mt-1.5" />}
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                        <p className="text-xs text-on-surface-variant">{item.detail}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="relative" ref={helpRef}>
          <button
            className="relative transition-colors hover:text-primary"
            title="Help"
            onClick={toggleHelp}
          >
            <Icon name="help_outline" size={24} />
          </button>

          {helpOpen && (
            <div className="absolute right-0 top-12 w-64 rounded-3xl border border-surface-container-highest bg-white p-2 shadow-xl" role="menu" aria-label="Help Menu">
              <button ref={helpFirstRef} role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container">Help Center</button>
              <button role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container">Keyboard Shortcuts</button>
              <button role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container">Contact Support</button>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-surface-container-highest shadow-sm transition-colors hover:text-primary"
            aria-label="Open profile menu"
          >
            <Icon name="account_circle" size={20} className="text-on-surface-variant" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-56 rounded-3xl border border-surface-container-highest bg-white p-2 shadow-xl" role="menu" aria-label="Profile Menu">
              {isLoggedIn && (
                <>
                  <button ref={profileFirstRef} role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container">My Profile</button>
                  <button role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container">Account Settings</button>
                </>
              )}
              <button onClick={handleAuthAction} role="menuitem" className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-surface-container">{isLoggedIn ? 'Logout' : 'Login'}</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
