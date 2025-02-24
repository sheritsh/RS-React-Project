import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeProvider';
import Header from '../Header';

describe('Header', () => {
  const mockProps = {
    searchTerm: '',
    onSearch: vi.fn(),
    reset: vi.fn(),
  };

  it('renders header with logo and search', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Header {...mockProps} />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('img', { name: /Логотип/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Поиск/i })).toBeInTheDocument();
  });

  it('calls reset when logo is clicked', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Header {...mockProps} />
        </ThemeProvider>
      </BrowserRouter>
    );

    const logo = screen.getByRole('img', { name: /Логотип/i });
    logo.click();
    expect(mockProps.reset).toHaveBeenCalled();
  });
});
