import React from 'react'
import Icon from '../Icon'

export default function StatCard({ label, value, icon, trend, trendUp = true, onClick = null }) {
  return (
    <div
      className="bg-surface-container-lowest rounded-[40px] p-6 shadow-sm hover:shadow-sm transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-on-surface-variant font-body text-sm mb-1">{label}</p>
          <p className="text-on-surface font-headline text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
        )}
      </div>
      {trend !== undefined && trend !== null && (
        <div className="flex items-center gap-1">
          <Icon name={trendUp ? 'trending_up' : 'trending_down'} size={16} className={trendUp ? 'text-green-600' : 'text-error'} />
          <span className={`text-sm font-body font-medium ${trendUp ? 'text-green-600' : 'text-error'}`}>
            {trend}% from last period
          </span>
        </div>
      )}
    </div>
  )
}
