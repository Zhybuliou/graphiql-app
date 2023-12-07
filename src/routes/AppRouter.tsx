import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { privateRoutes, publicRoutes } from './routes';
import RoutePaths from '../types/enums/routePaths';

function AppRouter() {
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {[...privateRoutes, ...publicRoutes].map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
      <Route
        path={RoutePaths.MAIN}
        element={<Navigate replace to={RoutePaths.WELCOME} />}
      />
    </Routes>
  );
}

export default AppRouter;
