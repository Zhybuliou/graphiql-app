import { memo } from 'react';
import { useRoutes, type RouteObject } from 'react-router-dom';

import WelcomePage from '../pages/WelcomePage';
import AuthenticationPage from '../pages/AuthenticationPage';
import GraphiQLPage from '../pages/GraphiQLPage';
import Page404 from '../pages/Page404';

const paths = {
  root: {
    path: '/',
  },
  welcome: {
    path: 'welcome ',
  },
  authentication: {
    path: '/sign',
  },
  graphiql: {
    path: '/graphiQL',
  },
};

const allRoutes: RouteObject = {
  path: paths.root.path,
  children: [
    { path: paths.root.path, element: <WelcomePage /> },
    { path: paths.authentication.path, element: <AuthenticationPage /> },
    { path: paths.graphiql.path, element: <GraphiQLPage /> },
    { path: '*', element: <Page404 /> },
  ],
};

const AppRouter = memo(() => {
  return useRoutes([allRoutes]);
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
