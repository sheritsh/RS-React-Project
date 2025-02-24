import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorFetch from '../ErrorFetch';

describe('ErrorFetch', () => {
  it('renders error message', () => {
    const errorMessage = 'Test error message';
    render(<ErrorFetch errorMessage={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders with null error message', () => {
    render(<ErrorFetch errorMessage={null} />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe('');
  });

  it('has correct styling', () => {
    render(<ErrorFetch errorMessage="Test error" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(
      'mx-auto',
      'mt-8',
      'p-4',
      'bg-red-50',
      'text-red-700'
    );
  });
});
