import React from 'react';

export interface TagProps {
  text: string;
  color?: string;
  onRemove?: () => void;
}

export function Tag({ text, color = '#6366f1', onRemove }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {text}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}