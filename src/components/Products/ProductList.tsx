import type { Product, Products } from '@interfaces/index';

import { ProductCard } from '@components/index';

type ProductListProps = {
  products: Products;
  onProductClick: (product: Product) => void;
};

const ProductList = ({ products, onProductClick }: ProductListProps) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
