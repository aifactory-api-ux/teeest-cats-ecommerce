import React from 'react';

export interface ExportButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ExportButton({ onClick, label = 'Export', disabled = false, loading = false }: ExportButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor: disabled || loading ? '#e5e7eb' : '#10b981',
        color: disabled || loading ? '#9ca3af' : '#ffffff',
        border: 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      {loading ? 'Exporting...' : label}
    </button>
  );
}