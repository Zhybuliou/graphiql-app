import { lazy } from 'react';
import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.WELCOME,
    Page: lazy(() => import('../pages/welcomePage/WelcomePage')),
  },

  {
    path: RoutePaths.SIGNIN,
    Page: lazy(() => import('../pages/signInPage/SignInPage')),
  },

  {
    path: RoutePaths.SIGNUP,
    Page: lazy(() => import('../pages/signUpPage/SignUpPage')),
  },

  {
    path: RoutePaths.PAGE404,
    Page: lazy(() => import('../pages/page404/Page404')),
  },
];

export const privateRoutes = [
  {
    path: RoutePaths.MAIN,
    Page: lazy(() => import('../pages/MainPage')),
  },
  {
    path: RoutePaths.PAGE404,
    Page: lazy(() => import('../pages/page404/Page404')),
  },
];
