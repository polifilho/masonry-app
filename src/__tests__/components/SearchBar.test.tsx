import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../../components';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
const mockOnSearch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('SearchBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnSearch.mockClear();
  });

  it('should render input and button', () => {
    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('redirect after search using click event', () => {
    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'hawaii' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('hawaii');
  });

  it('do not redirect if field is empty', () => {
    renderWithRouter(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search images/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(screen.getByText(/please, type a term to search/i)).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
