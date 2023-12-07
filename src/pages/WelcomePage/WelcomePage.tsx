import { NavLink } from 'react-router-dom';

import RoutePaths from '../../types/enums/routePaths';
import './WelcomePage.css';

function WelcomePage() {
  const user = false;

  return (
    <div className="page-wrapper welcome">
      <h1>Welcome page</h1>
      {user ? (
        <NavLink to={RoutePaths.MAIN}>
          <button type="button">Main page</button>
        </NavLink>
      ) : (
        <div className="authentication-wrapper">
          <NavLink to={RoutePaths.SIGNIN}>
            <button type="button">Sign in</button>
          </NavLink>
          <NavLink to={RoutePaths.SIGNUP}>
            <button type="button">Sign up</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
