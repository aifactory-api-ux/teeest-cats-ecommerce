import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Badge } from '../components/ui/Badge';
import { ExportButton } from '../components/ui/ExportButton';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: '$129.99', status: 'paid', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: '$79.99', status: 'pending', date: '2024-01-15' },
    { id: 'ORD-003', customer: 'Bob Wilson', email: 'bob@example.com', total: '$199.99', status: 'shipped', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', total: '$89.99', status: 'delivered', date: '2024-01-13' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer>
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Orders</h1>
          <ExportButton onClick={() => console.log('Export orders')} label="Export Orders" />
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
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Total</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{order.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <p style={{ fontWeight: 500 }}>{order.customer}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{order.email}</p>
                  </td>
                  <td style={{ padding: '1rem' }}>{order.date}</td>
                  <td style={{ padding: '1rem' }}>{order.total}</td>
                  <td style={{ padding: '1rem' }}>
                    <Badge label={order.status} variant={getStatusVariant(order.status) as any} />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6366f1',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      View Details
                    </button>
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