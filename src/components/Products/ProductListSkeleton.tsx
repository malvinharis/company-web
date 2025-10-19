import ProductCardSkeleton from './ProductCardSkeleton';

type ProductListSkeletonProps = {
  count?: number;
};

const ProductListSkeleton = ({ count = 6 }: ProductListSkeletonProps) => {
  return (
    <div className="product-list">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
