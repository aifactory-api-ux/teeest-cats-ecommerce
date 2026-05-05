import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { ProgressBar } from '../components/ui/ProgressBar';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+12.5%' },
    { label: 'Orders', value: '1,234', change: '+8.2%' },
    { label: 'Customers', value: '567', change: '+15.3%' },
    { label: 'Products', value: '89', change: '+3.1%' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: '$129.99', status: 'Paid' },
    { id: 'ORD-002', customer: 'Jane Smith', total: '$79.99', status: 'Pending' },
    { id: 'ORD-003', customer: 'Bob Wilson', total: '$199.99', status: 'Shipped' },
  ];

  return (
    <PageContainer>
      <Section>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>
          Admin Dashboard
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
              }}
            >
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#10b981' }}>{stat.change}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Orders</h2>
              <Link to="/admin/orders" style={{ fontSize: '0.875rem', color: '#6366f1' }}>
                View All
              </Link>
            </div>
            <table style={{ width: '100%', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280' }}>Order</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 0' }}>{order.id}</td>
                    <td style={{ padding: '0.75rem 0' }}>{order.customer}</td>
                    <td style={{ padding: '0.75rem 0' }}>{order.total}</td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          backgroundColor:
                            order.status === 'Paid' ? '#d1fae5' :
                            order.status === 'Pending' ? '#fef3c7' : '#dbeafe',
                          color:
                            order.status === 'Paid' ? '#065f46' :
                            order.status === 'Pending' ? '#92400e' : '#1e40af',
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
            }}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
              Sales Goal
            </h2>
            <ProgressBar value={75} max={100} label="Monthly Target" />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              75% of monthly goal achieved
            </p>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}