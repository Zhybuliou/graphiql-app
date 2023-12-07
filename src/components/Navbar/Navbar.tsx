import { NavLink } from 'react-router-dom';

import RoutePaths from '../../types/enums/routePaths';
import './navbar.css';

function Navbar() {
  return (
    <div className="wrapper-navbar">
      <NavLink to={RoutePaths.WELCOME}>
        <button type="button">Main page</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
