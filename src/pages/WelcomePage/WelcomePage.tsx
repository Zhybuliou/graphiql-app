import { NavLink } from 'react-router-dom';

import RouteParths from '../../types/enums/routeParths';
import './WelcomePage.css';

function WelcomePage() {
  const user = false;

  return (
    <div className="page-wrapper welcome">
      <h1>Welcome page</h1>
      {user ? (
        <NavLink to={RouteParths.MAIN}>
          <button type="button">Main page</button>
        </NavLink>
      ) : (
        <div className="authentication-wrapper">
          <NavLink to={RouteParths.SIGNIN}>
            <button type="button">Sign in</button>
          </NavLink>
          <NavLink to={RouteParths.SIGNUP}>
            <button type="button">Sign up</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
