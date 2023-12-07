import { memo } from 'react';
import { useRoutes, type RouteObject } from 'react-router-dom';

import WelcomePage from '../pages/WelcomePage';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import Page404 from '../pages/Page404';

enum RouteParths {
  WELCOME = '/',
  MAIN = '/main',
  SIGNIN = '/sing-in',
  SIGNUP = '/sign-up',
  PAGE404 = '*',
}

const allRoutes: RouteObject = {
  path: RouteParths.WELCOME,
  children: [
    { path: RouteParths.WELCOME, element: <WelcomePage /> },
    { path: RouteParths.MAIN, element: <MainPage /> },
    { path: RouteParths.SIGNIN, element: <SignInPage /> },
    { path: RouteParths.SIGNUP, element: <SignUpPage /> },
    { path: RouteParths.PAGE404, element: <Page404 /> },
  ],
};

const AppRouter = memo(() => {
  return useRoutes([allRoutes]);
});

export default AppRouter;
