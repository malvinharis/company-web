export const API_BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  PRODUCTS: '/product.json',
  IMAGES: '/image.json',
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
