export type ProductItem = {
  id: string;
  name: string;
};

export type ProductImage = {
  id: string[];
  image: string;
};

export type Product = ProductItem & {
  image?: string;
};

export type Products = Product[];
