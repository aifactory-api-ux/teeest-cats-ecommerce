import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { Badge } from '../components/ui/Badge';
import { ExportButton } from '../components/ui/ExportButton';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'CUS-001', name: 'John Doe', email: 'john@example.com', orders: 12, totalSpent: '$1,234.56', joined: '2024-01-01' },
    { id: 'CUS-002', name: 'Jane Smith', email: 'jane@example.com', orders: 8, totalSpent: '$876.43', joined: '2024-01-05' },
    { id: 'CUS-003', name: 'Bob Wilson', email: 'bob@example.com', orders: 5, totalSpent: '$432.12', joined: '2024-01-10' },
    { id: 'CUS-004', name: 'Alice Brown', email: 'alice@example.com', orders: 3, totalSpent: '$198.99', joined: '2024-01-12' },
  ];

  return (
    <PageContainer>
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Customers</h1>
          <ExportButton onClick={() => console.log('Export customers')} label="Export Customers" />
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
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Orders</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Total Spent</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: '#374151' }}>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <p style={{ fontWeight: 500 }}>{customer.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{customer.id}</p>
                  </td>
                  <td style={{ padding: '1rem' }}>{customer.email}</td>
                  <td style={{ padding: '1rem' }}>{customer.orders}</td>
                  <td style={{ padding: '1rem' }}>{customer.totalSpent}</td>
                  <td style={{ padding: '1rem' }}>{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageContainer>
  );
}