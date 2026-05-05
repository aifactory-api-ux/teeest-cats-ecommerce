import React from 'react';

export interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({ children, onClick, disabled = false, loading = false }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.625rem 1.25rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor: disabled || loading ? '#a5b4fc' : '#6366f1',
        color: '#ffffff',
        border: 'none',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease',
        boxShadow: disabled || loading ? 'none' : '0 1px 3px rgba(99, 102, 241, 0.3)',
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}