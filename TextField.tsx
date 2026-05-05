import React from 'react';

export interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

export function TextField({ value, onChange, label, placeholder, type = 'text', error }: TextFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '0.625rem 0.875rem',
          borderRadius: '0.5rem',
          border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 150ms ease',
          width: '100%',
        }}
      />
      {error && (
        <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>
      )}
    </div>
  );
}