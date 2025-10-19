import { useEffect } from 'react';
import Image from 'next/image';

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

import ImageHome from '@assets/images/img-home.png';
import ImageBanner from '@assets/images/img-banner.png';

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
        <div className="main__content">
          <div className="main__hero">
            <h1>We create smart products that make life simpler</h1>
            <p>
              Discover products and great deals that make your everyday life
              easier and more rewarding.
            </p>
          </div>
          <Image src={ImageHome} alt="image-home" className="main__image" />
        </div>
      </Section>

      <Section variant="gray" id="products">
        <h2 className="main__title">Discover Our Products</h2>

        <div className="main__banner">
          <div className="main__banner-wrapper">
            <Image
              src={ImageBanner}
              alt="image-banner"
              className="main__banner-image"
            />
            <p className="main__banner-description">
              Explore our curated selection of products and offers designed to
              make shopping simple and enjoyable
            </p>
          </div>
        </div>

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
