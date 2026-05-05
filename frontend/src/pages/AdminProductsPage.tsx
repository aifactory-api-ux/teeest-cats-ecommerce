import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { Badge } from '../components/ui/Badge';
import { Product } from '../types/product';
import { productsApi } from '../api/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getProducts({ limit: 100 });
        setProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <PageContainer>
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Products</h1>
          <PrimaryButton onClick={() => console.log('Add product')}>
            Add Product
          </PrimaryButton>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Stock</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.25rem',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>{product.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{product.brand}</p>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{product.category}</td>
                  <td style={{ padding: '1rem' }}>{formatPrice(product.price)}</td>
                  <td style={{ padding: '1rem' }}>
                    <Badge
                      label={`${product.stock} in stock`}
                      variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                    />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {product.rating.toFixed(1)} ({product.reviewCount})
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <SecondaryButton onClick={() => console.log('Edit', product.id)}>
                        Edit
                      </SecondaryButton>
                      <SecondaryButton onClick={() => console.log('Delete', product.id)}>
                        Delete
                      </SecondaryButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageContainer>
  );
}