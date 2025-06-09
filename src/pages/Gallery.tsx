import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { fetchPhotos } from '../services/pexels';
import type { Photo } from '../types/photo';
import { MasonryGrid, SearchBar, Spinner } from '../components';
import { useMobileBreakpoint } from '../hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || 'hawaii';
  const searchTerm = rawQuery.replace(/-/g, ' ');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileBreakpoint();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['photos', searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchPhotos(searchTerm, 30, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
  });

  const allPhotos: Photo[] = data?.pages.flatMap(p => p.photos) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '300px' }
    );

    const element = observerRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSearch = (term: string) => {
    navigate(`/search?q=${term}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>No images loaded.</div>;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <MasonryGrid photos={allPhotos} columns={isMobile ? 2 : 3} />
      {isFetchingNextPage && <Spinner />}
      <div ref={observerRef} style={{ height: '1px' }} />
    </>
  );
};

export default Gallery;
