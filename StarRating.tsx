import React from 'react';

export interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {
  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          style={{
            width: '1.25rem',
            height: '1.25rem',
            cursor: readOnly ? 'default' : 'pointer',
            fill: star <= Math.round(value) ? '#f59e0b' : '#d1d5db',
            transition: 'fill 150ms ease',
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}