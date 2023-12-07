import { Route, Routes, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import RouteParths from '../types/enums/routeParths';

function AppRouter() {
  const user = false;
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        {user ? (
          <Routes>
            {privateRoutes.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Routes>
        ) : (
          <Routes>
            {publicRoutes.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
            <Route
              path={RouteParths.MAIN}
              element={<Navigate replace to={RouteParths.WELCOME} />}
            />
          </Routes>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRouter;
