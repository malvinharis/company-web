import { useState } from 'react';
import pick from 'lodash.pick';

import { alertType } from '@enums/notification.enum';

import type { AxiosRequestConfig, AxiosResponse } from '@utils/axiosInstance';
import axiosInstance from '@utils/axiosInstance';

import useNotificationStore from '@store/useNotificationStore';

export enum FetchMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Fetcher = {
  url?: string;
  method?: FetchMethod;
  pagination?: boolean;
  showNotification?: boolean;
};

const useFetcher = <T>(
  config: Fetcher = {
    pagination: false,
    showNotification: true,
  },
): {
  data: T | null;
  fetchData(
    args?: Pick<AxiosRequestConfig, 'data' | 'params' | 'url'>,
  ): Promise<{ data: T; hasMoreData: boolean }>;
  hasMorePage: boolean;
  isError: boolean;
  isLoading: boolean;
  isLoadMore: boolean;
} => {
  const [data, setData] = useState<T | null>(
    config?.pagination ? ([] as T) : null,
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(
    config?.method === FetchMethod.GET,
  );
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [hasMorePage, setHasMorePage] = useState(false);

  const addAlert = useNotificationStore((state) => state.addAlert);

  const fetchData = async (
    args?: Pick<AxiosRequestConfig, 'data' | 'params' | 'url'>,
  ): Promise<{ data: T; hasMoreData: boolean }> => {
    const argsConfig = pick(config, ['url', 'method']);

    const fetchConfig: AxiosRequestConfig = {
      method: FetchMethod.GET,
      ...argsConfig,
      ...args,
    };

    config.showNotification = config.showNotification ?? true;

    const hasPaginationAndNotFirstPage: boolean =
      config?.pagination && fetchConfig.params && fetchConfig.params.page > 1;

    if (!config?.pagination) setData(null);

    if (config?.pagination && hasPaginationAndNotFirstPage) {
      setIsLoadMore(true);
    } else {
      setIsLoading(true);
    }

    setIsError(false);

    return axiosInstance(fetchConfig)
      .then((response: AxiosResponse) => {
        let hasMoreData = false;

        if (
          hasPaginationAndNotFirstPage &&
          Array.isArray(data) &&
          Array.isArray(response.data.data)
        ) {
          hasMoreData =
            response.data.page * response.data.perPage < response.data.total;

          setHasMorePage(hasMoreData);
          setData((prevData) =>
            Array.isArray(prevData)
              ? ([...prevData, ...response.data.data] as T)
              : (response.data.data as T),
          );
        } else {
          if (config?.pagination) {
            hasMoreData =
              response.data.page * response.data.perPage < response.data.total;

            setHasMorePage(hasMoreData);
          }

          setData(response.data.data as T);
        }

        const responseData = {
          data: response.data.data,
          hasMoreData,
        };

        return Promise.resolve(responseData);
      })
      .catch((error: unknown) => {
        setIsError(true);
        setData(config?.pagination ? ([] as T) : null);

        if (config.showNotification) {
          const err = error as {
            response?: {
              data?: { error?: { message?: string } };
              statusText?: string;
            };
          };
          const errorMessage =
            err?.response?.data?.error?.message ||
            err?.response?.statusText ||
            'Something happens in our side, please retry in a few moment.';

          addAlert({
            type: alertType.ERROR,
            message: errorMessage,
          });
        }

        const err = error as { response?: { data?: unknown } };
        return Promise.reject(err.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadMore(false);
      });
  };

  return {
    data,
    fetchData,
    hasMorePage,
    isError,
    isLoading,
    isLoadMore,
  };
};

export default useFetcher;
