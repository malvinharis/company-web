import axios, { type AxiosInstance } from 'axios';

import { API_CONFIG, API_ENDPOINTS } from '@constants/api.constants';

import type {
  QueryParams,
  ResponseData,
  ProductImage,
  ProductItem,
} from '@interfaces/index';

class ProductService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_ENDPOINTS.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
    });
  }

  async getProductItem(): Promise<ProductItem[]> {
    try {
      const response = await this.api.get(API_ENDPOINTS.PRODUCTS);
      const products = response.data.data;

      return products;
    } catch (error) {
      console.error('Error fetching product items:', error);
      throw error;
    }
  }

  async getProductImages(): Promise<ProductImage[]> {
    try {
      const response = await this.api.get(API_ENDPOINTS.IMAGES);
      const images = response.data.data;

      return images;
    } catch (error) {
      console.error('Error fetching product images:', error);
      throw error;
    }
  }

  private buildImageMap(images: ProductImage[]): Record<string, string> {
    const imageMap: Record<string, string> = {};

    for (const img of images) {
      for (const id of img.id) {
        imageMap[id] = img.image;
      }
    }

    return imageMap;
  }

  async getProducts(
    params?: QueryParams,
  ): Promise<ResponseData<(ProductItem & { image: string })[]>> {
    try {
      const [products, images] = await Promise.all([
        this.getProductItem(),
        this.getProductImages(),
      ]);

      const imageMap = this.buildImageMap(images);

      const response = products.map((product) => {
        const productId = product.id;
        const image = imageMap[productId];

        const result = {
          ...product,
          image,
        };

        return result;
      });

      // Get total count before pagination
      const total = response.length;

      // Apply pagination
      const page = params?.page || 1;
      const perPage = params?.perPage || 10;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedProducts = response.slice(startIndex, endIndex);

      return {
        data: paginatedProducts,
        total,
        page,
        perPage,
      };
    } catch (error) {
      console.error('Error fetching products :', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
