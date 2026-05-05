import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`page-container ${className}`} style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
    }}>
      {children}
    </div>
  );
}