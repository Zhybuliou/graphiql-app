import { lazy } from 'react';
import { RoutePaths } from '../types/enums/routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.WELCOME,
    Page: lazy(() => import('../pages/welcomePage/WelcomePage')),
  },

  {
    path: RoutePaths.SIGNIN,
    Page: lazy(() => import('../pages/SignInPage')),
  },

  {
    path: RoutePaths.SIGNUP,
    Page: lazy(() => import('../pages/SignUpPage')),
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
