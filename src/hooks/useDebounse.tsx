import URL from '@/config/index';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

export function useDebouncedSearch<T>(
  url: string,
  delay: number = 500,
  isSearchEncoded: boolean = false
) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<T | null>(null); // T is now an object or null
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const performSearch = async () => {
      if (searchQuery || searchQuery === '') {
        setLoading(true);
        try {
          // Cancel the previous request if it exists
          if (cancelTokenSource) {
            cancelTokenSource.cancel('Operation canceled due to new request.');
            setLoading(true);
          }
          // Create a new CancelTokenSource for the current request
          const newCancelTokenSource = axios.CancelToken.source();
          setCancelTokenSource(newCancelTokenSource);

          const resp = await URL.get(
            `${
              url.includes('?')
                ? `${url.split('?')[0]}/${
                    isSearchEncoded
                      ? encodeURIComponent(`%${searchQuery}%`)
                      : searchQuery
                  }?${url.split('?')[1]}`
                : `${url}${
                    isSearchEncoded
                      ? encodeURIComponent(`%${searchQuery}%`)
                      : searchQuery
                  }`
            }`,
            { cancelToken: newCancelTokenSource.token }
          );
          const responseData: T = resp.data;
          setSearchResults(responseData);
        } catch (error) {
          if (!axios.isCancel(error)) {
            setSearchResults(null);
          }
        } finally {
          setLoading(false);
        }
      } else setLoading(false);
    };

    if (searchQuery) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(performSearch, delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (cancelTokenSource) {
        cancelTokenSource.cancel(
          'Operation canceled due to component unmount.'
        );
      }
    };
  }, [searchQuery, delay, url, isSearchEncoded]);

  const handleSearchInputChange = (value: string) => setSearchQuery(value);

  return {
    searchQuery,
    searchResults,
    loading,
    handleSearchInputChange,
    setSearchQuery,
  };
}
