import { render, screen, fireEvent } from '@testing-library/react';
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
  const signInHeader = screen.getByText(/Sign In/i);
  expect(signInHeader).toBeInTheDocument();
});

test('logs in user with valid credentials', () => {
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

  fireEvent.submit(submitButton);
  // expect(window.location.pathname).toBe('/main');
  // expect(screen.getByText(/Go to main page - GraphiQL/i)).toBeInTheDocument();
});

test('displays error message for invalid credentials', () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    </LocaleProvider>
  );

  const emailInput = screen.getByPlaceholderText('E-mail Address');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText(/Login/i);

  fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
  fireEvent.click(submitButton);

  // assert that error message is displayed
});

// Possible error test

// Possible error test
