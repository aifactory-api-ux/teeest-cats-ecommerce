import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { TextField } from '../components/ui/TextField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';
import { User } from '../types/user';

export default function UserAccountPage() {
  const { user, login, register, logout, loading: authLoading } = useAuth();
  const { orders, fetchOrders } = useOrder();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        address: formData.address,
      });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
      case 'delivered':
        return 'success';
      case 'pending':
      case 'shipped':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (authLoading) {
    return (
      <PageContainer>
        <Section>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Loading...
          </div>
        </Section>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <Section>
          <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
              {isLoginView ? 'Sign In' : 'Create Account'}
            </h1>

            <form onSubmit={isLoginView ? handleLogin : handleRegister}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {!isLoginView && (
                  <>
                    <TextField
                      label="Full Name"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                      placeholder="John Doe"
                    />
                    <TextField
                      label="Address"
                      value={formData.address}
                      onChange={(value) => setFormData({ ...formData, address: value })}
                      placeholder="123 Main Street"
                    />
                  </>
                )}
                <TextField
                  label="Email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  placeholder="john@example.com"
                  type="email"
                />
                <TextField
                  label="Password"
                  value={formData.password}
                  onChange={(value) => setFormData({ ...formData, password: value })}
                  placeholder="Enter your password"
                  type="password"
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <PrimaryButton
                  onClick={isLoginView ? handleLogin : handleRegister}
                  disabled={authLoading}
                >
                  {isLoginView ? 'Sign In' : 'Create Account'}
                </PrimaryButton>
              </div>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
              {isLoginView ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {isLoginView ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
          <aside>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                  Account
                </p>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{user.name}</h2>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</p>
              </div>
              <SecondaryButton onClick={logout}>
                Sign Out
              </SecondaryButton>
            </div>
          </aside>

          <main>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Order History
            </h1>

            {orders.length === 0 ? (
              <p style={{ color: '#6b7280' }}>No orders yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      padding: '1.25rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div>
                        <p style={{ fontWeight: 600 }}>Order #{order.id.slice(0, 8)}</p>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge label={order.status} variant={getStatusVariant(order.status) as any} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </span>
                      <span style={{ fontWeight: 600 }}>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </Section>
    </PageContainer>
  );
}