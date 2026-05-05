import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { StarRating } from '../components/ui/StarRating';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { Review } from '../types/review';
import { productsApi } from '../api/products';
import { reviewsApi } from '../api/reviews';
import { Product } from '../types/product';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const [productData, reviewsData] = await Promise.all([
          productsApi.getProduct(productId),
          reviewsApi.getReviews(productId),
        ]);
        setProduct(productData);
        setReviews(reviewsData.reviews);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    console.log('Added to cart:', productId, 'quantity:', quantity);
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

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

  if (!product) {
    return (
      <PageContainer>
        <Section>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Product not found
          </div>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: product.category, href: `/category/${product.category.toLowerCase()}` },
            { label: product.name, href: `/product/${product.id}` },
          ]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
          <div
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x400?text=No+Image';
              }}
            />
          </div>

          <div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>
              {product.brand}
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <StarRating value={product.rating} readOnly />
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
              {formatPrice(product.price)}
            </p>

            <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={product.stock} />
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                {product.stock} in stock
              </span>
            </div>

            <PrimaryButton onClick={handleAddToCart}>
              Add to Cart
            </PrimaryButton>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Customer Reviews
          </h2>
          {reviews.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No reviews yet. Be the first to review this product!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <StarRating value={review.rating} readOnly />
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: '#374151', lineHeight: 1.6 }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </PageContainer>
  );
}