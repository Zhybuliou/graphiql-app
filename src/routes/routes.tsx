import WelcomePage from '../pages/WelcomePage/WelcomePage';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import Page404 from '../pages/Page404';

import RoutePaths from '../types/enums/routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.WELCOME,
    Page: WelcomePage,
  },

  {
    path: RoutePaths.SIGNIN,
    Page: SignInPage,
  },

  {
    path: RoutePaths.SIGNUP,
    Page: SignUpPage,
  },

  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];

export const privateRoutes = [
  {
    path: RoutePaths.MAIN,
    Page: MainPage,
  },
  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];
