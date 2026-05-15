import React from 'react'
import Icon from '../Icon'

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-body font-medium text-on-surface mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-2 rounded-lg border appearance-none transition-all duration-200 font-body text-sm
            ${
              error
                ? 'border-error focus:ring-error'
                : 'border-on-surface/10 focus:border-on-surface/20 focus:ring-primary'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white
          `}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon name="unfold_more" size={18} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
      </div>
      {error && <p className="text-error text-xs font-body mt-1">{error}</p>}
    </div>
  )
}
