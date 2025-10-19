import { useEffect } from 'react';

import type { Product, Products } from '@interfaces/index';
import {
  FetchMethod,
  useFetcher,
  useInfiniteScroll,
  useModal,
} from '@hooks/index';

import {
  Header,
  Section,
  LoadingSpinner,
  EmptyState,
  ProductList,
  ProductModal,
  ProductListSkeleton,
} from '@components/index';

const PER_PAGE = 10;

export default function Home() {
  const {
    data: products,
    fetchData: fetchProducts,
    isLoading,
    isLoadMore,
    hasMorePage,
  } = useFetcher<Products>({
    url: '/products',
    method: FetchMethod.GET,
    pagination: true,
  });

  const { page, setLoadMoreRef, resetPage } = useInfiniteScroll({
    hasMorePage,
  });
  const modal = useModal<Product>();

  const handleResetPage = () => {
    resetPage();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleResetPage();

    const params = {
      page: 1,
      perPage: PER_PAGE,
    };

    fetchProducts({ params });
  }, []);

  useEffect(() => {
    if (page > 1 && hasMorePage) {
      const params = {
        page,
        perPage: PER_PAGE,
      };

      fetchProducts({ params });
    }
  }, [page]);

  return (
    <div className="main" id="home">
      <Header title="Company." />

      <Section variant="primary">
        <div className="main__description">
          <h1>
            With a commitment to quality and trust, we deliver products that
            make your shopping experience better
          </h1>
          <p>
            We provide innovative products and services that help people find
            what they love with ease.
          </p>
        </div>
      </Section>

      <Section variant="gray" id="products">
        <h2 className="main__title">Discover Our Products</h2>

        {isLoading && <ProductListSkeleton />}

        {!isLoading && products?.length === 0 && (
          <EmptyState message="No products available" />
        )}

        {products && products.length > 0 && (
          <>
            <ProductList products={products} onProductClick={modal.open} />

            {isLoadMore && <LoadingSpinner message="Loading products..." />}

            {hasMorePage && <div ref={setLoadMoreRef} />}
          </>
        )}
      </Section>

      {modal.isOpen && modal.data && (
        <ProductModal product={modal.data} onClose={modal.close} />
      )}
    </div>
  );
}
