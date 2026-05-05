import React from 'react';

export interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, total, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const maxVisiblePages = 5;

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          backgroundColor: '#ffffff',
          cursor: page === 1 ? 'not-allowed' : 'pointer',
          color: page === 1 ? '#d1d5db' : '#374151',
          fontSize: '0.875rem',
        }}
      >
        Previous
      </button>

      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {getPages().map((p, index) =>
          typeof p === 'number' ? (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.375rem',
                border: p === page ? 'none' : '1px solid #d1d5db',
                backgroundColor: p === page ? '#6366f1' : '#ffffff',
                color: p === page ? '#ffffff' : '#374151',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: p === page ? 600 : 400,
              }}
            >
              {p}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} style={{ padding: '0 0.5rem', color: '#9ca3af' }}>
              {p}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          backgroundColor: '#ffffff',
          cursor: page === totalPages ? 'not-allowed' : 'pointer',
          color: page === totalPages ? '#d1d5db' : '#374151',
          fontSize: '0.875rem',
        }}
      >
        Next
      </button>
    </div>
  );
}