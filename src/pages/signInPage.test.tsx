import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LocaleProvider } from '../context/local';
import * as firebase from '../firebase/firebase';

import SignInPage from './SignInPage';
import AppRouter from '../routes/AppRouter';

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

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;

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
});

test('should call logInWithEmailAndPassword when form is submitted', async () => {
  const spy = vi.spyOn(firebase, 'logInWithEmailAndPassword');

  render(
    <LocaleProvider>
      <MemoryRouter>
        <AppRouter />
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
  await waitFor(() => {
    fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Qwerty1234%' } });
  });

  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('testMail@test.com', 'Qwerty1234%');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

test('should show an error message from react-toastify if the login or password is incorrect', async () => {
  render(
    <LocaleProvider>
      <MemoryRouter>
        <AppRouter />
        <ToastContainer />
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
  await waitFor(() => {
    fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrectPassword' } });
  });

  await waitFor(() => {
    fireEvent.click(submitButton);
    expect(
      screen.getByText(/Firebase: Error, autoization invalid/i)
    ).toBeInTheDocument();
  });
});
