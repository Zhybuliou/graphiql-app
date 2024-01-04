import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../App';
import { LocaleProvider } from '../../context/local';
import { Navbar } from '../navbar/Navbar';
import { AppRouter } from '../../routes/AppRouter';

const setup = () =>
  render(
    <LocaleProvider>
      <MemoryRouter>
        <Navbar />
        <AppRouter />
      </MemoryRouter>
    </LocaleProvider>
  );
describe('Check render LocalToggle', () => {
  it('check show App', () => {
    render(<App />);
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
  it('check work LocalToggle', () => {
    setup();
    expect(screen.getByText(/ru/i)).toBeInTheDocument();
    const button = screen.getByTestId('localToggle');
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByText(/рус/i)).toBeInTheDocument();
    });
  });
});
