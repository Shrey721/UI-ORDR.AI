import React from 'react'
import Icon from '../Icon'

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  icon = null,
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
        {icon && (
          <Icon name={icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={20} />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2 rounded-lg border transition-all duration-200 font-body text-sm
            ${
              error
                ? 'border-error focus:ring-error'
                : 'border-on-surface/10 focus:border-on-surface/20 focus:ring-primary'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-0
          `}
          {...props}
        />
      </div>
      {error && <p className="text-error text-xs font-body mt-1">{error}</p>}
    </div>
  )
}
