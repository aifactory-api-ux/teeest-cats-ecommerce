import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({ label, variant = 'default', size = 'md' }: BadgeProps) {
  const colors = {
    default: { bg: '#e5e7eb', text: '#374151' },
    success: { bg: '#d1fae5', text: '#065f46' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    error: { bg: '#fee2e2', text: '#991b1b' },
  };

  const sizes = {
    sm: { fontSize: '0.75rem', padding: '0.125rem 0.5rem' },
    md: { fontSize: '0.875rem', padding: '0.25rem 0.75rem' },
  };

  const style = colors[variant];
  const sizeStyle = sizes[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        fontSize: sizeStyle.fontSize,
        fontWeight: 500,
        padding: sizeStyle.padding,
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {label}
    </span>
  );
}