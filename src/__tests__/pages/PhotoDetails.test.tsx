import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PhotoDetails from '../../pages/PhotoDetails';

const mockNavigate = vi.fn();
const mockPhoto = {
  id: 1,
  alt: 'Rio de Janeioro',
  photographer: 'Alice',
  photographer_url: 'https://pexels.com/alice',
  src: {
    large: 'https://via.placeholder.com/600x400',
  },
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: {
        photo: mockPhoto,
      },
    }),
  };
});

describe('PhotoDetails', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render photo details', () => {
    render(<PhotoDetails />);

    expect(screen.getByAltText(/Rio de Janeioro/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Galery/i })).toBeInTheDocument();
  });

  it('should back to home page after click event', () => {
    render(<PhotoDetails />);
    const button = screen.getByRole('button', { name: /Back to Galery/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
