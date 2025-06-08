import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { fetchPhotos } from '../services/pexels';
import type { Photo } from '../types/photo';
import MasonryGrid from '../components/MasonryGrid';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('hawaii');
  const observerRef = useRef<HTMLDivElement | null>(null);

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
    setSearchTerm(term);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>No images loaded.</div>;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <MasonryGrid photos={allPhotos} columns={3} />
      {isFetchingNextPage && <Spinner />}
      <div ref={observerRef} style={{ height: '1px' }} />
    </>
  );
};

export default Gallery;
