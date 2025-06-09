import { fetchPhotos } from '../../services/pexels';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('fetchPhotos', () => {
  let BASE_URL: string;

  const mockResponse = {
    photos: [{ id: 1, alt: 'Test', src: { medium: 'url' } }],
    total_results: 60,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    BASE_URL = 'https://api.pexels.com/v1/search?query=hawaii&per_page=30&page=1';
  });

  it('make request and return the expected result', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const data = await fetchPhotos('hawaii', 30, 1);

    expect(mockFetch).toHaveBeenCalledWith(
      BASE_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      })
    );

    expect(data.photos).toHaveLength(1);
    expect(data.nextPage).toBe(2);
  });

  it('should return nextPage as null in the last page', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockResponse, total_results: 30 }),
    } as Response);

    const result = await fetchPhotos('beach', 30, 1);
    expect(result.nextPage).toBe(null);
  });

  it('throw an erro if the response is not OK', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(fetchPhotos('invalid', 30, 1)).rejects.toThrow('Error fetching photos');
  });
});
