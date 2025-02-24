import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../MainPage';
import animeCardsReducer from '../../features/animeCards/animeCardsSlice';
import { apiSlice } from '../../features/api/apiSlice';
import { ThemeProvider } from '../../context/ThemeProvider';

const createMockStore = () => {
  return configureStore({
    reducer: {
      animeCards: animeCardsReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={createMockStore()}>
      <ThemeProvider>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('MainPage', () => {
  it('renders main page components', async () => {
    renderWithProviders(<MainPage />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /поиск/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    renderWithProviders(<MainPage />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /поиск/i });

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });
  });

  it('handles pagination', async () => {
    renderWithProviders(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Вперед');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });
  });

  it('handles anime selection', async () => {
    renderWithProviders(<MainPage />);

    await waitFor(() => {
      const animeTitle = screen.getByText('Test Anime');
      fireEvent.click(animeTitle);
      expect(screen.getByText('Test Anime Details')).toBeInTheDocument();
    });
  });
});
