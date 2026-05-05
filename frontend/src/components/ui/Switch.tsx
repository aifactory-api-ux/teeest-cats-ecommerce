import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative',
          width: '2.75rem',
          height: '1.5rem',
          backgroundColor: checked ? '#6366f1' : '#d1d5db',
          borderRadius: '9999px',
          transition: 'background-color 150ms ease',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0.125rem',
            left: checked ? '1.375rem' : '0.125rem',
            width: '1.25rem',
            height: '1.25rem',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            transition: 'left 150ms ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      {label && <span style={{ fontSize: '0.875rem', color: '#374151' }}>{label}</span>}
    </label>
  );
}