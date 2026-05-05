import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <span style={{ color: '#9ca3af' }}>/</span>}
          {index === items.length - 1 ? (
            <span style={{ color: '#374151', fontWeight: 500 }}>{item.label}</span>
          ) : (
            <Link
              to={item.href}
              style={{
                color: '#6366f1',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}