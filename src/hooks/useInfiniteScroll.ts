import { useState, useRef, useCallback, useEffect } from 'react';

type UseInfiniteScrollProps = {
  hasMorePage?: boolean;
};

const useInfiniteScroll = (props?: UseInfiniteScrollProps) => {
  const { hasMorePage = true } = props || {};
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);

  const resetPage = () => setPage(1);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && !isLoadingRef.current && hasMorePage) {
        isLoadingRef.current = true;
        setPage((prev) => prev + 1);
      }
    },
    [hasMorePage],
  );

  const setLoadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (loadMoreRef.current && observer.current) {
        observer.current.unobserve(loadMoreRef.current);
      }

      loadMoreRef.current = node;

      if (typeof window !== 'undefined' && !observer.current) {
        observer.current = new IntersectionObserver(handleObserver, {
          threshold: 0.1,
          rootMargin: '100px',
        });
      }

      if (node && observer.current) {
        observer.current.observe(node);
      }
    },
    [handleObserver],
  );

  useEffect(() => {
    // Reset loading flag when page changes (after increment completes)
    isLoadingRef.current = false;
  }, [page]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { setLoadMoreRef, page, setPage, resetPage };
};

export default useInfiniteScroll;
