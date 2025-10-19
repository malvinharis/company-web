import { useEffect } from 'react';

import type { Product } from '@interfaces/index';

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={handleOverlayClick} />
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="tw-w-5 tw-h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="modal__image-wrapper">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="modal__image"
            />
          ) : (
            <div className="tw-w-full tw-h-96 tw-flex tw-items-center tw-justify-center tw-bg-gray-light">
              <span className="tw-text-secondary">No image available</span>
            </div>
          )}
        </div>
        <div className="modal__info">
          <p className="modal__subtitle">Product No. {product.id}</p>
          <h2 className="modal__title">{product.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
