import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { TextField } from '../components/ui/TextField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useOrder } from '../hooks/useOrder';

export default function CheckoutPage() {
  const { createOrder, loading, error } = useOrder();
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        shippingAddress,
        paymentMethod: 'stripe',
      });
      setOrderPlaced(true);
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  if (orderPlaced) {
    return (
      <PageContainer>
        <Section>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#d1fae5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Order Placed Successfully!
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Thank you for your purchase. Your order is being processed.
            </p>
            <PrimaryButton onClick={() => window.location.href = '/'}>
              Continue Shopping
            </PrimaryButton>
          </div>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Shipping Address
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <TextField
                label="Full Name"
                value=""
                onChange={() => {}}
                placeholder="John Doe"
              />
              <TextField
                label="Street Address"
                value={shippingAddress}
                onChange={setShippingAddress}
                placeholder="123 Main Street"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <TextField
                  label="City"
                  value=""
                  onChange={() => {}}
                  placeholder="New York"
                />
                <TextField
                  label="ZIP Code"
                  value=""
                  onChange={() => {}}
                  placeholder="10001"
                />
              </div>
              <TextField
                label="Phone"
                value=""
                onChange={() => {}}
                placeholder="+1 (555) 123-4567"
                type="tel"
              />
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '2rem 0 1.5rem' }}>
              Payment Method
            </h2>

            <div
              style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb',
              }}
            >
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Payment will be processed securely via Stripe after order confirmation.
              </p>
            </div>

            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                {error}
              </p>
            )}

            <div style={{ marginTop: '2rem' }}>
              <PrimaryButton onClick={handleSubmit} disabled={loading || !shippingAddress}>
                {loading ? 'Processing...' : 'Place Order'}
              </PrimaryButton>
            </div>
          </form>

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
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Your order summary will appear here.
            </p>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}