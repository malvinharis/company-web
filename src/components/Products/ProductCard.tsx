import type { Product } from '@interfaces/index';

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__image-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-light">
            <span className="tw-text-secondary tw-text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="product-card__content">
        <p className="product-card__subtitle">Product No. {product.id}</p>
        <h3 className="product-card__title">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
