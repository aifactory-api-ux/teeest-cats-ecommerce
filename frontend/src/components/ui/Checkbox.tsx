import React from 'react';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '1.125rem',
          height: '1.125rem',
          borderRadius: '0.25rem',
          border: `2px solid ${checked ? '#6366f1' : '#d1d5db'}`,
          backgroundColor: checked ? '#6366f1' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 150ms ease',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label && <span style={{ fontSize: '0.875rem', color: '#374151' }}>{label}</span>}
    </label>
  );
}