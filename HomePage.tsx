import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { ProductCard } from '../components/ui/ProductCard';
import { NewsletterForm } from '../components/ui/NewsletterForm';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

export default function HomePage() {
  const { products, fetchProducts } = useProducts();
  const { categories } = useCategories();

  useEffect(() => {
    fetchProducts({ limit: 8 });
  }, [fetchProducts]);

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          padding: '5rem 1rem',
          textAlign: 'center',
        }}
      >
        <PageContainer>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Welcome to teeest cats
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, and more.
          </p>
          <Link
            to="/category/electronics"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              backgroundColor: '#ffffff',
              color: '#6366f1',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Shop Now
          </Link>
        </PageContainer>
      </section>

      <Section id="categories">
        <PageContainer>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            Shop by Category
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase()}`}
                style={{
                  display: 'block',
                  padding: '2rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 300ms ease',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                  {category.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{category.description}</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section id="featured-products">
        <PageContainer>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            Featured Products
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section id="newsletter" style={{ backgroundColor: '#f9fafb' }}>
        <PageContainer>
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Subscribe to Our Newsletter
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Get the latest updates on new products and upcoming sales.
            </p>
            <NewsletterForm onSubmit={(email) => console.log('Newsletter:', email)} loading={false} />
          </div>
        </PageContainer>
      </Section>
    </div>
  );
}