import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '../../context/local';
import * as firebase from '../../firebase/firebase';

import SignUpPage from './SignUpPage';
import { AppRouter } from '../../routes/AppRouter';

test('renders sign up page', () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    </LocaleProvider>
  );
  const signInHeader = screen.getByText(/Sign Up, please/i);
  expect(signInHeader).toBeInTheDocument();
});

test('displays error messages if input fields are invalid', async () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    </LocaleProvider>
  );

  const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;

  const passwordInput = screen.getByPlaceholderText(
    'Password'
  ) as HTMLInputElement;

  const confirmPasswordInput = screen.getByPlaceholderText(
    'Confirm password'
  ) as HTMLInputElement;

  fireEvent.change(nameInput, { target: { value: 'A' } });
  fireEvent.change(emailInput, { target: { value: 'invalidMailexample.com' } });
  fireEvent.change(passwordInput, {
    target: { value: 'BadPassword' },
  });
  fireEvent.change(confirmPasswordInput, {
    target: { value: 'BadPassword1' },
  });

  await waitFor(() => {
    expect(
      screen.getByText(/Name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least one digit/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Confirm Password does not match/i)
    ).toBeInTheDocument();
  });
});

test('should call registerWithEmailAndPassword when form is submitted', async () => {
  const spy = vi.spyOn(firebase, 'registerWithEmailAndPassword');

  render(
    <LocaleProvider>
      <MemoryRouter>
        <AppRouter />
        <SignUpPage />
      </MemoryRouter>
    </LocaleProvider>
  );

  const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;

  const passwordInput = screen.getByPlaceholderText(
    'Password'
  ) as HTMLInputElement;

  const confirmPasswordInput = screen.getByPlaceholderText(
    'Confirm password'
  ) as HTMLInputElement;

  const submitButton = screen.getByTestId('button-signUp') as HTMLButtonElement;
  await waitFor(() => {
    fireEvent.change(nameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Qwerty1234%' },
    });
    fireEvent.change(passwordInput, { target: { value: 'Qwerty1234%' } });
  });

  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'User',
      'testMail@test.com',
      'Qwerty1234%'
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

test('checking submit button status', async () => {
  render(
    <LocaleProvider>
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    </LocaleProvider>
  );

  const submitButton = screen.getByTestId('button-signUp') as HTMLButtonElement;
  await waitFor(() => {
    expect(submitButton).toHaveAttribute('disabled');
  });
});

test('navigates to SignInPage when "Sign In" link is clicked', () => {
  render(
    <LocaleProvider>
      <BrowserRouter>
        <AppRouter />
        <SignUpPage />
      </BrowserRouter>
    </LocaleProvider>
  );
  fireEvent.click(screen.getByText('Sign in'));

  expect(window.location.pathname).toBe('/sign-in');
});
