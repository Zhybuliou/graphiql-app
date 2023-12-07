import { NavLink } from 'react-router-dom';

import RouteParths from '../../types/enums/routeParths';
import './navbar.css';

function Navbar() {
  return (
    <div className="wrapper-navbar">
      <NavLink to={RouteParths.WELCOME}>
        <button type="button">Main page</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
