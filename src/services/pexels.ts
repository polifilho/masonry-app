import type { Photo } from '../types/photo';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PER_PAGE = 30;
const PAGE = 1;

type PhotoResponse = {
  photos: Photo[];
  nextPage: number | null;
};

export const fetchPhotos = async (
    query: string,
    perPage = PER_PAGE,
    page = PAGE
  ): Promise<PhotoResponse> => {
    const res = await fetch(
      `${BASE_URL}/search?query=${query}&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error('Error fetching photos');
    }
  
    const data = await res.json();
    const totalPages = Math.ceil(data.total_results / perPage);
  
    return {
      photos: data.photos,
      nextPage: page < totalPages ? page + 1 : null,
    };
  };
  