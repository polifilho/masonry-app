import { render, screen } from '@testing-library/react';
import { MasonryGrid } from '../../../components';
import type { Photo } from '../../../types';
import { BrowserRouter } from 'react-router-dom';

const mockPhotos: Photo[] = [
  {
    id: 1,
    alt: 'Photo 1',
    photographer: 'Alice',
    photographer_url: 'https://pexels.com/alice',
    src: {
      original: '',
      large: '',
      medium: 'https://via.placeholder.com/300x200?text=1',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
  },
  {
    id: 2,
    alt: 'Photo 2',
    photographer: 'Bob',
    photographer_url: 'https://pexels.com/bob',
    src: {
      original: '',
      large: '',
      medium: 'https://via.placeholder.com/300x200?text=2',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
  },
];

const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

describe('MasonryGrid', () => {
  it('render columns and images', () => {
    renderWithRouter(<MasonryGrid photos={mockPhotos} columns={2} />);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Photo 1');
    expect(images[1]).toHaveAttribute('alt', 'Photo 2');
  });
});
