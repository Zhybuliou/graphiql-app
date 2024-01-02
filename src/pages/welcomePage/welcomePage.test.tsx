import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import { AppStateProvider } from '../../context/appState';
import { LocaleProvider } from '../../context/local';

const setup = () =>
  act(() => {
    render(
      <LocaleProvider>
        <AppStateProvider>
          <MemoryRouter>
            <WelcomePage />
          </MemoryRouter>
        </AppStateProvider>
      </LocaleProvider>
    );
  });

describe('Check render WelcomePage', () => {
  it('check show welcome page description Section', () => {
    setup();
    expect(screen.getByText(/GraphiQL Project/i)).toBeInTheDocument();
  });
});
