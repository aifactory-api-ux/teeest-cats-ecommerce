import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { TextField } from '../components/ui/TextField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Chip } from '../components/ui/Chip';

export default function AdminContentPage() {
  const [selectedPage, setSelectedPage] = useState('privacy');
  const [content, setContent] = useState('');

  const pages = [
    { id: 'privacy', name: 'Privacy Policy' },
    { id: 'terms', name: 'Terms of Service' },
    { id: 'cookies', name: 'Cookie Policy' },
  ];

  const handleSave = () => {
    console.log('Saving content for', selectedPage, ':', content);
  };

  return (
    <PageContainer>
      <Section>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Content Management
        </h1>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <aside style={{ width: '200px' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Pages
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: selectedPage === page.id ? '#6366f1' : 'transparent',
                    color: selectedPage === page.id ? '#ffffff' : '#374151',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: selectedPage === page.id ? 500 : 400,
                    transition: 'all 150ms ease',
                  }}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </aside>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {pages.find((p) => p.id === selectedPage)?.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Edit the content for this page. HTML is supported.
              </p>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter page content (HTML supported)..."
              rows={15}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                resize: 'vertical',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <PrimaryButton onClick={handleSave}>
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}