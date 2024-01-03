import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Check render footer', () => {
  it('check show year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
