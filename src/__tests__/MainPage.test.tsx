import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { mockAnime } from './test-utils';
import { apiSlice } from '../features/api/apiSlice';
import { useFetchAnimeQuery } from '../features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

vi.mock('../features/api/apiSlice', async (importOriginal) => {
  const actual = importOriginal() as object;

  return {
    ...actual,
    useFetchAnimeQuery: vi.fn(),
  };
});

const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFetchAnimeQuery).mockResolvedValue({
      data: {
        data: [mockAnime],
        pagination: {
          last_visible_page: 4,
          has_next_page: true,
          current_page: 1,
          items: {
            count: 25,
            total: 100,
            per_page: 25,
          },
        },
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
  });

  it('renders initial state correctly', async () => {
    renderWithRouter(<MainPage />);

    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument();
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles search correctly', async () => {
    renderWithRouter(<MainPage />);

    const searchInput = screen.getByPlaceholderText('Поиск...');
    const searchButton = screen.getByText('Поиск');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    renderWithRouter(<MainPage />);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Вперед');
    fireEvent.click(nextButton);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles anime selection correctly', async () => {
    renderWithRouter(<MainPage />);

    await waitFor(() => {
      const article = screen.getByRole('article');
      fireEvent.click(article);
    });

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles error state correctly', async () => {
    const errorMessage = 'Test error';
    vi.mocked(useFetchAnimeQuery).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    renderWithRouter(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
