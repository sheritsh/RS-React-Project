import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../ErrorButton';

describe('ErrorButton', () => {
  it('renders error button', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Вызвать ошибку')).toBeInTheDocument();
  });

  it('throws error when clicked', () => {
    render(<ErrorButton />);

    const errorButton = screen.getByText('Вызвать ошибку');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('Ошибка в кнопке!');
  });

  it('sets error state when clicked', () => {
    const { container } = render(<ErrorButton />);

    const errorButton = screen.getByText('Вызвать ошибку');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow();

    expect(container.innerHTML).toBe('');
  });
});
