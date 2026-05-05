import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: '3rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>teeest cats</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Your favorite online store for quality products at great prices.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Shop
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/category/electronics" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Electronics</Link></li>
            <li><Link to="/category/clothing" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Clothing</Link></li>
            <li><Link to="/category/home" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Home & Garden</Link></li>
            <li><Link to="/category/sports" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Sports</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Account
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/account" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>My Account</Link></li>
            <li><Link to="/cart" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Cart</Link></li>
            <li><Link to="/checkout" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Legal
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</Link></li>
            <li><Link to="/cookies" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Cookie Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Contact
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem' }}>Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '2rem auto 0',
          paddingTop: '2rem',
          borderTop: '1px solid #374151',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
        }}
      >
        © {new Date().getFullYear()} teeest cats ecommerce. All rights reserved.
      </div>
    </footer>
  );
}