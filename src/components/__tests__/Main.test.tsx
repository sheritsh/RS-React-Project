import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Main from '../Main';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';

const mockStore = configureStore({
  reducer: {
    animeCards: animeCardsReducer,
  },
});

const mockAnimeList = [
  {
    mal_id: 1,
    title: 'Test Anime',
    synopsis: 'Test synopsis',
    images: { webp: { image_url: 'test.jpg' } },
  },
];

describe('Main', () => {
  const mockOnAnimeSelect = vi.fn();

  it('renders children content', () => {
    render(
      <Provider store={mockStore}>
        <Main animeList={[]} onAnimeSelect={mockOnAnimeSelect}>
          <div>Test Child Content</div>
        </Main>
      </Provider>
    );

    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  it('renders anime list', () => {
    render(
      <Provider store={mockStore}>
        <Main animeList={mockAnimeList} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    expect(screen.getByText('Test Anime')).toBeInTheDocument();
  });

  it('has correct role and classes', () => {
    render(
      <Provider store={mockStore}>
        <Main animeList={[]} onAnimeSelect={mockOnAnimeSelect} />
      </Provider>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveClass(
      'flex-grow',
      'container',
      'mx-auto',
      'px-4',
      'py-8'
    );
  });
});
