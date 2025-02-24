import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Card from '../Card';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';

const mockAnime = {
  mal_id: 1,
  title: 'Test Anime',
  synopsis: 'Test synopsis',
  images: {
    webp: {
      image_url: 'test-image.jpg',
    },
  },
};

const mockStore = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
  },
});

describe('Card', () => {
  const mockOnAnimeSelect = vi.fn();

  it('renders card with anime information', () => {
    render(
      <Provider store={mockStore}>
        <Card anime={mockAnime} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(screen.getByText('Test Anime')).toBeInTheDocument();
    expect(screen.getByText(/Test synopsis/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('calls onAnimeSelect when clicking title or image', () => {
    render(
      <Provider store={mockStore}>
        <Card anime={mockAnime} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Test Anime'));
    expect(mockOnAnimeSelect).toHaveBeenCalledWith(mockAnime);

    fireEvent.click(screen.getByRole('img'));
    expect(mockOnAnimeSelect).toHaveBeenCalledTimes(2);
  });

  it('toggles anime selection when checkbox is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Card anime={mockAnime} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
