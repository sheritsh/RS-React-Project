import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchResults from '../SearchResults';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';

const mockStore = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
  },
});

describe('SearchResults', () => {
  const mockOnAnimeSelect = vi.fn();
  const mockAnimeList = [
    {
      mal_id: 1,
      title: 'Test Anime',
      synopsis: 'Test synopsis',
      images: { webp: { image_url: 'test.jpg' } },
    },
  ];

  it('renders anime cards when results exist', () => {
    render(
      <Provider store={mockStore}>
        <SearchResults
          animeList={mockAnimeList}
          onAnimeSelect={mockOnAnimeSelect}
        />
      </Provider>
    );

    expect(screen.getByText('Test Anime')).toBeInTheDocument();
  });

  it('shows no results message when list is empty', () => {
    render(
      <Provider store={mockStore}>
        <SearchResults animeList={[]} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(
      screen.getByText('По указанному запросу ничего не нашлось')
    ).toBeInTheDocument();
  });
});
