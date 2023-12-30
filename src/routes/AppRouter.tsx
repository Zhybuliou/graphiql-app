import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { useUser } from '../firebase/firebase';
import { privateRoutes, publicRoutes } from './routes';
import { RoutePaths } from '../types/enums/routePaths';
import { SkeletonPage } from '../components/skeletons/SkeletonPage';
import { FallbackPage } from '../pages/FallbackPage';

function AppRouter() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={FallbackPage}
      onReset={() => navigate(RoutePaths.WELCOME)}
      resetKeys={[location]}
    >
      <Suspense fallback={<SkeletonPage />}>
        {user ? (
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
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRouter;
