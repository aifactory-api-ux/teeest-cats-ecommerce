import React, { useState } from 'react';

export interface NewsletterFormProps {
  onSubmit: (email: string) => void;
  loading: boolean;
  error?: string;
}

export function NewsletterForm({ onSubmit, loading, error }: NewsletterFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.625rem 0.875rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !email}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.5rem',
            backgroundColor: loading || !email ? '#a5b4fc' : '#6366f1',
            color: '#ffffff',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: loading || !email ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>}
    </form>
  );
}