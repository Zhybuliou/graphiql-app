import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '../context/local';
import SignInPage from './SignInPage';

test('renders sign in page', () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    </LocaleProvider>
  );
  const signInHeader = screen.getByText(/Sign In, please/i);
  expect(signInHeader).toBeInTheDocument();
});

test('displays an error message if the email is incorrect', async () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    </LocaleProvider>
  );

  const emailInput = screen.getByPlaceholderText('E-mail Address');

  fireEvent.change(emailInput, { target: { value: 'invalidMailexample.com' } });

  await waitFor(() => {
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });
});

test('checking submit button status', async () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    </LocaleProvider>
  );

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText(
    'Password'
  ) as HTMLInputElement;
  const submitButton = screen.getByText(/Login/i) as HTMLButtonElement;

  fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Qwerty1234%' } });

  await waitFor(() => {
    expect(submitButton).not.toHaveAttribute('disabled');
  });
  // expect(window.location.pathname).toBe('/main');
});
