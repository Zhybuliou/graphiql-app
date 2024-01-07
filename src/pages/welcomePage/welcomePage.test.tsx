import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import { LocaleProvider } from '../../context/local';

const setup = async () =>
  act(() => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </LocaleProvider>
    );
  });

describe('Check render WelcomePage', () => {
  it('check show welcome page description Section', () => {
    setup();
    waitFor(() => {
      expect(screen.getByText(/GraphiQL Project/i)).toBeInTheDocument();
    });
  });
});
