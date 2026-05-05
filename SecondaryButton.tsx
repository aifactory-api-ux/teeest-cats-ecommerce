import React from 'react';

export interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SecondaryButton({ children, onClick, disabled = false, loading = false }: SecondaryButtonProps) {
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
        backgroundColor: 'transparent',
        color: disabled || loading ? '#9ca3af' : '#6366f1',
        border: `2px solid ${disabled || loading ? '#e5e7eb' : '#6366f1'}`,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}