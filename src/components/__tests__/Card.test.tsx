import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import { mockAnime } from '../../__tests__/test-utils';
import { configureStore } from '@reduxjs/toolkit/react';
import { apiSlice } from '../../features/api/apiSlice';
import { Provider } from 'react-redux';

vi.mock('../../features/api/apiSlice', async (importOriginal) => {
  const actual = await importOriginal() as object;

  return {
    ...actual,
    useFetchAnimeQuery: vi.fn(),
    useFetchAnimeDetailsQuery: vi.fn(),
  };
});

// Создаем моковый store
const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

describe('Card Component', () => {
  it('renders card with anime data', () => {
    const mockOnAnimeSelect = vi.fn();
    render(
      <Provider store={mockStore}>
        <Card anime={mockAnime} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    const heading = screen.getByRole('heading', { level: 3 });
    const image = screen.getByRole('img');

    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Test synopsis...')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.webp');
  });

  it('calls onAnimeSelect when clicked', () => {
    const mockOnAnimeSelect = vi.fn();

    render(
      <Provider store={mockStore}>
        <Card anime={mockAnime} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('article'));
    expect(mockOnAnimeSelect).toHaveBeenCalledWith(mockAnime);
  });

  it('shows "Описание отсутствует" when synopsis is missing', () => {
    const mockOnAnimeSelect = vi.fn();
    const animeWithoutSynopsis = { ...mockAnime, synopsis: '' };

    render(
      <Provider store={mockStore}>
        <Card anime={animeWithoutSynopsis} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(screen.getByText('Описание отсутствует')).toBeInTheDocument();
  });
});
