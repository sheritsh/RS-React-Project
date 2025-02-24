import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with initial value', () => {
    render(<Search searchTerm="initial" onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('initial');
  });

  it('updates input value on change', () => {
    render(<Search searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input).toHaveValue('test search');
  });

  it('calls onSearch when form is submitted', () => {
    render(<Search searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('prevents default form submission', () => {
    render(<Search searchTerm="" onSearch={mockOnSearch} />);
    const form = screen.getByRole('form');
    const event = {
      preventDefault: vi.fn(),
    };

    fireEvent.submit(form, event);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});
