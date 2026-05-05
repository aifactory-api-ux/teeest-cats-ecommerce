import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Section } from '../components/layout/Section';
import { ProductCard } from '../components/ui/ProductCard';
import { Pagination } from '../components/ui/Pagination';
import { FilterAccordion } from '../components/ui/FilterAccordion';
import { useProducts } from '../hooks/useProducts';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products, total, page, limit, fetchProducts, loading } = useProducts();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts({ category: categoryId, page: currentPage, limit: 12 });
  }, [categoryId, currentPage, fetchProducts]);

  const filterOptions = [
    { id: 'electronics', label: 'Electronics' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'home', label: 'Home & Garden' },
    { id: 'sports', label: 'Sports' },
  ];

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <PageContainer>
      <Section>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, textTransform: 'capitalize', marginBottom: '0.5rem' }}>
            {categoryId}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {loading ? 'Loading...' : `${total} products found`}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          <aside>
            <FilterAccordion
              filters={filterOptions}
              selected={selectedFilters}
              onChange={setSelectedFilters}
            />
          </aside>

          <main>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                Loading products...
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
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

                {total > limit && (
                  <div style={{ marginTop: '2rem' }}>
                    <Pagination
                      page={currentPage}
                      total={total}
                      pageSize={limit}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </Section>
    </PageContainer>
  );
}