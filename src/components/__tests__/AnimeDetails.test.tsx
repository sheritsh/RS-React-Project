import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AnimeDetails from '../AnimeDetails';
import { apiSlice } from '../../features/api/apiSlice';

const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

describe('AnimeDetails', () => {
  const mockOnClose = vi.fn();

  it('renders loading state initially', () => {
    render(
      <Provider store={mockStore}>
        <AnimeDetails animeId={1} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('renders anime details after loading', async () => {
    render(
      <Provider store={mockStore}>
        <AnimeDetails animeId={1} onClose={mockOnClose} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Anime Details')).toBeInTheDocument();
      expect(screen.getByText('Detailed synopsis')).toBeInTheDocument();
      expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
      expect(screen.getByText('8.5')).toBeInTheDocument();
    });
  });
});
