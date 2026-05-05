import React, { useState } from 'react';
import { Chip } from './Chip';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterAccordionProps {
  filters: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function FilterAccordion({ filters, selected, onChange }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleFilter = (filterId: string) => {
    if (selected.includes(filterId)) {
      onChange(selected.filter((id) => id !== filterId));
    } else {
      onChange([...selected, filterId]);
    }
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f9fafb',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#374151',
        }}
      >
        Filters
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms ease' }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              color={selected.includes(filter.id) ? '#6366f1' : '#6b7280'}
              onClick={() => toggleFilter(filter.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}