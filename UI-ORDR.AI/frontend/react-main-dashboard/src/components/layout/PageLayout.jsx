import React from 'react'

export default function PageLayout({ children, title, subtitle, action = null }) {
  return (
    <div className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-surface p-8">
      {/* Page Header */}
      {(title || action) && (
        <div className="flex items-start justify-between mb-8">
          <div>
            {title && <h1 className="text-3xl font-headline font-bold text-on-surface mb-2">{title}</h1>}
            {subtitle && <p className="text-on-surface-variant font-body text-sm">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Content */}
      <div className="w-full">{children}</div>
    </div>
  )
}
