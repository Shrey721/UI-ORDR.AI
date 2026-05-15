import React from 'react'
import Icon from '../Icon'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  onClick = null,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClass = 'inline-flex items-center justify-center gap-2 font-body transition-all'

  const variants = {
    primary:
      'rounded-full bg-primary px-6 py-2 text-xs font-bold text-on-primary transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60',
    secondary:
      'inline-flex h-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container-highest px-3 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-60',
    ghost: 'rounded-full px-4 py-2 text-sm font-medium text-primary hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60',
    danger: 'rounded-full bg-error px-6 py-2 text-xs font-bold text-on-primary transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60',
  }

  const sizes = {
    sm: 'text-xs',
    md: '',
    lg: 'text-sm',
    full: 'w-full',
  }

  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  )
}
