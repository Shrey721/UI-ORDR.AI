import React, { useState } from 'react'
import Icon from '../Icon'

export default function FilterBar({ filters = [], onFilterChange = null, showSearch = true, onSearchChange = null }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  return (
    <div className="flex items-center gap-4 flex-wrap py-4">
      {showSearch && (
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border border-on-surface/10 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
          />
        </div>
      )}

      {filters.map((filter, idx) => (
        <div key={filter.id || idx} className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === filter.id ? null : filter.id)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg border border-on-surface/10 hover:bg-surface-container-high transition-colors text-on-surface font-body text-sm"
          >
            {filter.label}
            <Icon name="expand_more" size={18} />
          </button>

          {activeDropdown === filter.id && filter.options && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-on-surface/10 rounded-lg shadow-lg z-20 min-w-[200px]">
              {filter.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => {
                    onFilterChange?.({ filterId: filter.id, value: option.value })
                    setActiveDropdown(null)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-surface-container text-on-surface font-body text-sm first:rounded-t-lg last:rounded-b-lg"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
