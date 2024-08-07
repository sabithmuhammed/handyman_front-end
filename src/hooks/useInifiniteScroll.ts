import { useCallback, useEffect, useState, useRef } from "react";

export type InfiniteScrollResult<T> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  isLoading: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
};

export type InfiniteScrollCallback<T> = {
  data: T[];
  hasMore: boolean;
};

export const useInfiniteScroll = <T>(
  fetchMoreData: (page: number) => Promise<InfiniteScrollCallback<T>>,
  threshold: number = 100
): InfiniteScrollResult<T> => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreData) return;
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const { data: newData, hasMore } = await fetchMoreData(page);
      setData((prevData) => [...prevData, ...newData]);
      setHasMoreData(hasMore);
      setPage((prevPage) => prevPage + 1);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [fetchMoreData, hasMoreData, page]);

  useEffect(() => {
    loadMore();
  }, []); // This will run only once on mount

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

          let shouldLoadMore = false;

          if (container) {
            const containerRect = container.getBoundingClientRect();
            const containerBottom = containerRect.bottom;
            shouldLoadMore = containerBottom - windowHeight <= threshold;
          } else {
            shouldLoadMore = windowHeight + scrollTop >= documentHeight - threshold;
          }

          if (shouldLoadMore) {
            loadMore();
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore, threshold]);

  const result: InfiniteScrollResult<T> = {
    data,
    setData,
    isLoading,
    containerRef,
  };

  return result;
};