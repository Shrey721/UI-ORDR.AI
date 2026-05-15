import React from 'react'

export default function ToggleSwitch({ checked = false, onChange = null, disabled = false, label = null }) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-12 h-7 rounded-full transition-colors duration-300 ${
            checked ? 'bg-[#1AB15B]' : 'bg-surface-container-high'
          }`}
        ></div>
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
            checked ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
      {label && <span className="font-body text-sm text-on-surface">{label}</span>}
    </label>
  )
}
