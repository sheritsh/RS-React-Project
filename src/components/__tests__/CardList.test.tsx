import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardList from '../CardList';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';

const mockStore = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
  },
});

const mockAnimeList = [
  {
    mal_id: 1,
    title: 'Test Anime 1',
    synopsis: 'Test synopsis 1',
    images: { webp: { image_url: 'test1.jpg' } },
  },
  {
    mal_id: 2,
    title: 'Test Anime 2',
    synopsis: 'Test synopsis 2',
    images: { webp: { image_url: 'test2.jpg' } },
  },
];

describe('CardList', () => {
  const mockOnAnimeSelect = vi.fn();

  it('renders list of anime cards', () => {
    render(
      <Provider store={mockStore}>
        <CardList animeList={mockAnimeList} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(screen.getByText('Test Anime 1')).toBeInTheDocument();
    expect(screen.getByText('Test Anime 2')).toBeInTheDocument();
  });

  it('displays empty state message when no anime', () => {
    render(
      <Provider store={mockStore}>
        <CardList animeList={[]} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(
      screen.getByText('По указанному запросу ничего не нашлось')
    ).toBeInTheDocument();
  });
});
