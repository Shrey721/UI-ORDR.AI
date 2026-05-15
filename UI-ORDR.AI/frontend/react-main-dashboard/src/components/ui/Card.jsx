import React from 'react'

export default function Card({ children, className = '', title = null, subtitle = null, action = null }) {
  return (
    <div className={`rounded-3xl border border-surface-container-highest bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}>
      {(title || action) && (
        <div className="mb-6 flex items-center justify-between border-b border-surface-container-highest pb-4">
          <div>
            {title && <h3 className="text-lg font-headline font-bold text-on-surface">{title}</h3>}
            {subtitle && <p className="text-sm font-body text-on-surface-variant">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
