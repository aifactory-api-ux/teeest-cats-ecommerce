import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { TextField } from '../components/ui/TextField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useContact } from '../hooks/useContact';

export default function ContactPage() {
  const { sendMessage, loading, error, success } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <PageContainer>
      <Section>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>
            Contact Us
          </h1>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '2rem' }}>
            Have a question or feedback? We'd love to hear from you.
          </p>

          {success && (
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#d1fae5',
                color: '#065f46',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <TextField
                label="Your Name"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="John Doe"
              />
              <TextField
                label="Email Address"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="john@example.com"
                type="email"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={5}
                  style={{
                    padding: '0.625rem 0.875rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                {error}
              </p>
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <PrimaryButton
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.email || !formData.message}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </PrimaryButton>
            </div>
          </form>

          <div
            style={{
              marginTop: '3rem',
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
            }}
          >
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Other Ways to Reach Us
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
              <p>Email: support@teeestcats.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: Monday - Friday, 9am - 6pm EST</p>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}