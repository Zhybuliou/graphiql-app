import { lazy } from 'react';
import RouteParths from '../types/enums/routeParths';

export const publicRoutes = [
  {
    path: RouteParths.WELCOME,
    Page: lazy(() => import('../pages/WelcomePage/WelcomePage')),
  },

  {
    path: RouteParths.SIGNIN,
    Page: lazy(() => import('../pages/SignInPage')),
  },

  {
    path: RouteParths.SIGNUP,
    Page: lazy(() => import('../pages/SignUpPage')),
  },

  {
    path: RouteParths.PAGE404,
    Page: lazy(() => import('../pages/Page404')),
  },
];

export const privateRoutes = [
  {
    path: RouteParths.MAIN,
    Page: lazy(() => import('../pages/MainPage')),
  },
  {
    path: RouteParths.PAGE404,
    Page: lazy(() => import('../pages/Page404')),
  },
];
