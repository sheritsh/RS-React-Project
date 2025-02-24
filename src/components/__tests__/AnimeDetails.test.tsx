import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AnimeDetails from '../AnimeDetails';
import { mockAnime } from '../../__tests__/test-utils';
import {
  apiSlice,
  useFetchAnimeDetailsQuery,
} from '../../features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Мокируем RTK Query хук
vi.mock('../../features/api/apiSlice', async (importOriginal) => {
  const actual = await importOriginal() as object;

  return {
    ...actual,
    useFetchAnimeDetailsQuery: vi.fn(),
  };
});

// Создаем моковое хранилище
const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

describe('AnimeDetails Component', () => {
  const mockOnClose = vi.fn();

  it('shows loading state initially', async () => {
    vi.mocked(useFetchAnimeDetailsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <AnimeDetails animeId={1} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();
    });
  });

  it('shows anime details after loading', async () => {
    vi.mocked(useFetchAnimeDetailsQuery).mockReturnValue({
      data: { data: mockAnime },
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <AnimeDetails animeId={1} onClose={mockOnClose} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
      expect(screen.getByText('Эпизоды:')).toBeInTheDocument();
      expect(screen.getByText('Статус:')).toBeInTheDocument();
      expect(screen.getByText('Год:')).toBeInTheDocument();
    });
  });

  it('shows error state if fetch fails', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(useFetchAnimeDetailsQuery).mockRejectedValue(error);

    render(
      <Provider store={mockStore}>
        <AnimeDetails animeId={1} onClose={mockOnClose} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
