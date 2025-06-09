import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

vi.doMock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: null }),
    useNavigate: () => vi.fn(),
  };
});

const PhotoDetails = (await import('../../pages/PhotoDetails')).default;

describe('PhotoDetails (fallback)', () => {
  it('should render an error message when there is no photo', () => {
    render(<PhotoDetails />);
    expect(screen.getByText(/Images not found./i)).toBeInTheDocument();
  });
});
