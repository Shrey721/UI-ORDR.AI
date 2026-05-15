import React from 'react'

export default function Tabs({ tabs, activeTab, onTabChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 border-b border-on-surface/10 overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-body font-medium text-sm whitespace-nowrap transition-colors duration-200 border-b-2 ${
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
