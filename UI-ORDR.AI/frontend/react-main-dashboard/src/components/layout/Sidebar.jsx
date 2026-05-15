import React from 'react'
import { navigationItems } from '../../data/mainDashboardData'
import Icon from '../Icon'

export default function Sidebar({ currentPage, onPageChange }) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col overflow-y-auto border-r border-surface-container-highest bg-surface-variant pt-16 no-scrollbar">
      {/* Logo */}
      <a
        href="https://ordrai.in/"
        className="mx-6 mb-6 flex h-10 items-center justify-start"
        aria-label="Visit ORDR.ai"
      >
        <img
          src="/assets/ordr-ai-logo.png"
          alt="ORDR.ai"
          className="h-10 w-auto object-contain"
        />
      </a>

      {/* Navigation Items */}
      <nav className="px-6 pb-6">
        <div className="flex flex-col gap-1 py-4">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex w-full items-center gap-4 rounded-full px-6 py-3 text-left transition-all ${
              currentPage === item.id
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <Icon name={item.icon} size={24} />
            <span className={`font-headline text-sm ${currentPage === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-surface-container-highest px-6 py-8">
        <button className="mx-2 flex items-center gap-3 rounded-full px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-highest" type="button">
          <Icon name="logout" size={24} />
          <span className="font-headline text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
