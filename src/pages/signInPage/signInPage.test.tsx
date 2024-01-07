import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '../../context/local';
import * as firebase from '../../firebase/firebase';

import SignInPage from './SignInPage';
import { AppRouter } from '../../routes/AppRouter';

test('renders sign in page', async () => {
  act(() => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </LocaleProvider>
    );
  });
  const signInHeader = screen.getByText(/Sign In, please/i);

  await waitFor(() => {
    expect(signInHeader).toBeInTheDocument();
  });
});

test('displays an error message if the email is incorrect', async () => {
  act(() => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </LocaleProvider>
    );
  });

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(emailInput, {
      target: { value: 'invalidMailexample.com' },
    });
  });

  await waitFor(() => {
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });
});

test('checking submit button status', async () => {
  act(() => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </LocaleProvider>
    );
  });

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText(
    'Password'
  ) as HTMLInputElement;
  const submitButton = screen.getByText(/Login/i) as HTMLButtonElement;

  act(() => {
    fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Qwerty1234%' } });
  });

  await waitFor(() => {
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});

test('should call logInWithEmailAndPassword when form is submitted', async () => {
  const spy = vi.spyOn(firebase, 'logInWithEmailAndPassword');

  act(() => {
    render(
      <LocaleProvider>
        <MemoryRouter>
          <AppRouter />
          <SignInPage />
        </MemoryRouter>
      </LocaleProvider>
    );
  });

  const emailInput = screen.getByPlaceholderText(
    /E-mail Address/i
  ) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText(
    'Password'
  ) as HTMLInputElement;

  const submitButton = screen.getByText(/Login/i) as HTMLButtonElement;
  await waitFor(() => {
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'testMail@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Qwerty1234%' } });
    });
  });

  act(() => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('testMail@test.com', 'Qwerty1234%');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

test('navigates to SignUpPage when "Register" link is clicked', async () => {
  act(() => {
    render(
      <LocaleProvider>
        <BrowserRouter>
          <AppRouter />
          <SignInPage />
        </BrowserRouter>
      </LocaleProvider>
    );
  });
  act(() => {
    fireEvent.click(screen.getByText('Register'));
  });
  await waitFor(() => {
    expect(window.location.pathname).toBe('/sign-up');
  });
});
