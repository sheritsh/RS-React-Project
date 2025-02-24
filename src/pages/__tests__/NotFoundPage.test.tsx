import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('NotFoundPage', () => {
  it('renders not found page content', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('has correct link to home page', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeProvider>
    );

    const homeLink = screen.getByText('Вернуться на главную');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has correct styling', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </ThemeProvider>
    );

    const container = screen.getByTestId('not-found-container');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'flex-grow',
      'p-8'
    );
  });
});
