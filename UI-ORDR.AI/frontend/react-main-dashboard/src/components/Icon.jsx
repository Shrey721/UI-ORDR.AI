import React from 'react'

export default function Icon({ name, size = 24, fill = false, className = '' }) {
  const baseClass = fill ? 'fill' : ''
  return (
    <span
      className={`material-symbols-outlined ${baseClass} ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: `${size}px` }}
    >
      {name}
    </span>
  )
}
