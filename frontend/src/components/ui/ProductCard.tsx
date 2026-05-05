import React from 'react';
import { Product } from '../../types/product';
import { StarRating } from './StarRating';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 300ms ease',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '12rem',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.brand}
        </span>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', margin: 0 }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarRating value={product.rating} readOnly />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({product.reviewCount})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}