import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import type { Photo } from '../types/photo';
import { useNavigate } from 'react-router-dom';

interface MasonryGridProps {
  photos: Photo[];
  columns?: number;
}

const GridContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const MasonryGrid = ({ photos, columns = 3 }: MasonryGridProps) => {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const columnRefs = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleIndexes.includes(idx)) {
            setVisibleIndexes(prev => [...prev, idx]);
          }
        });
      },
      { rootMargin: '200px' }
    );

    columnRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.setAttribute('data-index', i.toString());
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [photos]);

  const distributed = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [] as Photo[]);
    photos.forEach((photo, i) => {
      cols[i % columns].push(photo);
    });
    return cols;
  }, [photos, columns]);

  const handleClick = useCallback(
    (photo: Photo) => navigate(`/photo/${photo.id}`, { state: { photo } }),
    [navigate]
  );

  return (
    <GridContainer>
      {distributed.map((columnPhotos, i) => (
        <Column key={i} ref={el => (columnRefs.current[i] = el!)}>
          {visibleIndexes.includes(i) &&
            columnPhotos.map(photo => (
                <img
                    key={photo.id}
                    src={photo.src.medium}
                    alt={photo.alt}
                    loading="lazy"
                    style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={() => handleClick(photo)}
                />
            ))}
        </Column>
      ))}
    </GridContainer>
  );
};
