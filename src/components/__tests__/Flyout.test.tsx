import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../Flyout';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';

const createMockStore = (selectedAnime: number[] = []) => {
  return configureStore({
    reducer: {
      animeCards: animeCardsReducer,
    },
    preloadedState: {
      animeCards: {
        selectedAnime,
        allAnime: [
          {
            mal_id: 1,
            title: 'Test Anime',
          },
        ],
      },
    },
  });
};

describe('Flyout', () => {
  it('does not render when no anime is selected', () => {
    const store = createMockStore([]);
    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders when anime is selected', () => {
    const store = createMockStore([1]);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(
      screen.getByText('1 аниме выбрано для загрузки данных')
    ).toBeInTheDocument();
  });

  it('handles unselect all button click', () => {
    const store = createMockStore([1]);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Отменить выбранные'));
    expect(store.getState().animeCards.selectedAnime).toHaveLength(0);
  });
});
