import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api/',
});

export type { AxiosError, AxiosRequestConfig, AxiosResponse };

export default axiosInstance;
