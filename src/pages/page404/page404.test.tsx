import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page404 from './Page404';

describe('Check render page 404', () => {
  it('check show text Not Found', () => {
    render(<Page404 />);
    expect(screen.getByText(/Not Foundddddddddd/i)).toBeInTheDocument();
  });
});
