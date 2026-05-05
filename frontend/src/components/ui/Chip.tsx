import React from 'react';

export interface ChipProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

export function Chip({ label, color = '#6366f1', onClick }: ChipProps) {
  const isClickable = !!onClick;

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.375rem 0.875rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor: `${color}15`,
        color: color,
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 150ms ease',
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}