import React from 'react';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  user: User | null;
  cartCount: number;
  onLogout: () => void;
}

export function Navbar({ user, cartCount, onLogout }: NavbarProps) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.75rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1', textDecoration: 'none' }}>
          teeest cats
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/category/electronics" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
            Electronics
          </Link>
          <Link to="/category/clothing" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
            Clothing
          </Link>
          <Link to="/category/home" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
            Home & Garden
          </Link>
          <Link to="/category/sports" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
            Sports
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <Link to="/account" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
                {user.name}
              </Link>
              <button
                onClick={onLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/account"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              Sign In
            </Link>
          )}

          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  borderRadius: '50%',
                  width: '1rem',
                  height: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}