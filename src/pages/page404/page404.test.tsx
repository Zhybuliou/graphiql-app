import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page404 from './Page404';
import { LocaleProvider } from '../../context/local';

describe('Check render page 404', () => {
  it('check show text Not Found', () => {
    render(
      <LocaleProvider>
        <Page404 />
      </LocaleProvider>
    );
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
