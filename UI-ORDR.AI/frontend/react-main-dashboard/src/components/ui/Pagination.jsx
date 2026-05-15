import React from 'react'
import Icon from '../Icon'

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange = null }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-on-surface-variant font-body text-sm">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 hover:bg-surface-container rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="chevron_left" size={20} />
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1
          const shouldShow = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages

          if (!shouldShow && i > 0 && i < totalPages - 1) {
            return i === 1 ? <span key="dots" className="px-2 text-on-surface-variant">...</span> : null
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`w-8 h-8 rounded-lg font-body font-medium text-sm transition-all ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'hover:bg-surface-container text-on-surface'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-surface-container rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="chevron_right" size={20} />
        </button>
      </div>
    </div>
  )
}
