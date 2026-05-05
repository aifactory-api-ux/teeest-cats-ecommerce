import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, max = 100, label, color = '#6366f1' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: '0.5rem',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </div>
  );
}