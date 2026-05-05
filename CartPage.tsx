import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, refetch } = useCart();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const subtotal = cart?.items.reduce((sum, item) => sum + (item.quantity * 9999), 0) || 0;

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateItem(productId, quantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeItem(productId);
  };

  if (loading) {
    return (
      <PageContainer>
        <Section>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Loading cart...
          </div>
        </Section>
      </PageContainer>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <PageContainer>
        <Section>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Your cart is empty
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Add some products to your cart to see them here.
            </p>
            <Link to="/">
              <PrimaryButton onClick={() => {}}>
                Continue Shopping
              </PrimaryButton>
            </Link>
          </div>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
          Shopping Cart
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          <div>
            {cart.items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.375rem',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`https://via.placeholder.com/80x80?text=${item.productId.slice(0, 4)}`}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Product {item.productId.slice(0, 8)}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {formatPrice(9999)}
                  </p>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(qty) => handleUpdateQuantity(item.productId, qty)}
                    min={1}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>
                    {formatPrice(item.quantity * 9999)}
                  </span>
                  <SecondaryButton onClick={() => handleRemoveItem(item.productId)}>
                    Remove
                  </SecondaryButton>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              height: 'fit-content',
            }}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight: 500 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Shipping</span>
                <span style={{ fontWeight: 500 }}>Free</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Link to="/checkout">
              <PrimaryButton onClick={() => {}}>
                Proceed to Checkout
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}