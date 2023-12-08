import { lazy } from 'react';
import RoutePaths from '../types/enums/routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.WELCOME,
    Page: lazy(() => import('../pages/WelcomePage/WelcomePage')),
  },

  {
    path: RoutePaths.SIGNIN,
    Page: lazy(() => import('../pages/SignInPage/SignInPage')),
  },

  {
    path: RoutePaths.SIGNUP,
    Page: lazy(() => import('../pages/SignUpPage/SignUpPage')),
  },

  {
    path: RoutePaths.PAGE404,
    Page: lazy(() => import('../pages/Page404')),
  },
];

export const privateRoutes = [
  {
    path: RoutePaths.MAIN,
    Page: lazy(() => import('../pages/MainPage')),
  },
  {
    path: RoutePaths.PAGE404,
    Page: lazy(() => import('../pages/Page404')),
  },
];
