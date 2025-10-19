export type QueryParams = {
  page?: number;
  perPage?: number;
};

export type ResponseData<T> = {
  data: T | null;
  total: number;
  page: number;
  perPage: number;
};
