import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { useLegal } from '../hooks/useLegal';

export default function PrivacyPage() {
  const { page, loading, fetchLegalPage } = useLegal();

  useEffect(() => {
    fetchLegalPage('privacy');
  }, [fetchLegalPage]);

  if (loading) {
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

  return (
    <PageContainer>
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {page?.title || 'Privacy Policy'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Last updated: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'N/A'}
          </p>
          <div
            style={{ lineHeight: 1.8, color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: page?.content || '' }}
          />
        </div>
      </Section>
    </PageContainer>
  );
}