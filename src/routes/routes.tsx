import WelcomePage from '../pages/WelcomePage';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import Page404 from '../pages/Page404';

import RouteParths from '../types/enums/routeParths';

export const publicRoutes = [
  {
    path: RouteParths.WELCOME,
    Page: WelcomePage,
  },

  {
    path: RouteParths.SIGNIN,
    Page: SignInPage,
  },

  {
    path: RouteParths.SIGNUP,
    Page: SignUpPage,
  },

  {
    path: RouteParths.PAGE404,
    Page: Page404,
  },
];

export const privateRoutes = [
  {
    path: RouteParths.MAIN,
    Page: MainPage,
  },
  {
    path: RouteParths.PAGE404,
    Page: Page404,
  },
];
