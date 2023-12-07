import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import RouteParths from '../types/enums/routeParths';

function AppRouter() {
  const user = false;
  return user ? (
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
  );
}

export default AppRouter;
