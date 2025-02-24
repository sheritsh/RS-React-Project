import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders footer content', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(/created by/i)).toBeInTheDocument();
    expect(screen.getByText('//sheritsh')).toBeInTheDocument();
    expect(screen.getByAltText('RS School')).toBeInTheDocument();
  });

  it('has correct link to github', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const githubLink = screen.getByText('//sheritsh').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sheritsh');
  });
});
