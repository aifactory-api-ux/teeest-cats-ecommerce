import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      style={{
        padding: '2rem 0',
      }}
    >
      {children}
    </section>
  );
}