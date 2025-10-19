import Skeleton from '@components/UI/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <Skeleton height="100%" width="100%" className="tw-rounded-md" />
      </div>
      <div className="product-card__content">
        <Skeleton
          height="16px"
          width="80px"
          className="tw-mb-2 tw-rounded-md"
        />
        <Skeleton height="20px" width="100%" className="tw-rounded-md" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
