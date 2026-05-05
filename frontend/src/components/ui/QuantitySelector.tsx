import React from 'react';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        style={{
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          border: 'none',
          cursor: value <= min ? 'not-allowed' : 'pointer',
          color: value <= min ? '#d1d5db' : '#374151',
          fontSize: '1.25rem',
        }}
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        style={{
          width: '3rem',
          height: '2.5rem',
          textAlign: 'center',
          border: 'none',
          borderLeft: '1px solid #d1d5db',
          borderRight: '1px solid #d1d5db',
          fontSize: '0.875rem',
          outline: 'none',
        }}
      />
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        style={{
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          border: 'none',
          cursor: value >= max ? 'not-allowed' : 'pointer',
          color: value >= max ? '#d1d5db' : '#374151',
          fontSize: '1.25rem',
        }}
      >
        +
      </button>
    </div>
  );
}