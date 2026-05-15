import React from 'react'

export default function StatusBadge({ status, customColor = null }) {
  const statusColors = {
    Pending: { bg: 'bg-primary-container', text: 'text-primary' },
    Preparing: { bg: 'bg-[#F8E1B0]', text: 'text-[#6D5610]' },
    Ready: { bg: 'bg-[#E2F6EA]', text: 'text-secondary' },
    Completed: { bg: 'bg-[#E2F6EA]', text: 'text-secondary' },
    Cancelled: { bg: 'bg-[#FFDAD6]', text: 'text-error' },
    Active: { bg: 'bg-[#E2F6EA]', text: 'text-secondary' },
    New: { bg: 'bg-[#DCE8FF]', text: 'text-[#2850A6]' },
    Inactive: { bg: 'bg-surface-container-high', text: 'text-on-surface-variant' },
    Standard: { bg: 'bg-primary-container', text: 'text-primary' },
    Breakfast: { bg: 'bg-[#F8E1B0]', text: 'text-[#6D5610]' },
    Snacks: { bg: 'bg-[#EADCF8]', text: 'text-[#6A369C]' },
  }

  const colors = customColor || statusColors[status] || statusColors.Inactive

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${colors.bg} ${colors.text}`}
    >
      {status}
    </span>
  )
}
