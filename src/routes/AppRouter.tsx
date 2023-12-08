import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import RouteParths from '../types/enums/routeParths';
import SkeletonPage from '../components/skeletons/SkeletonPage';
import Fallback from '../components/fallback/Fallback';

function AppRouter() {
  const user = false;
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => navigate(RouteParths.WELCOME)}
      resetKeys={[location]}
    >
      <Suspense fallback={<SkeletonPage />}>
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
