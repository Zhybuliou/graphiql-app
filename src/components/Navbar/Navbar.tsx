import { NavLink } from 'react-router-dom';

import RouteParths from '../../types/enums/routeParths';
import './navbar.css';
import Local from '../Local/Local';
import { useLocale } from '../../context/local';

function Navbar() {
  const { state } = useLocale();
  return (
    <div className="wrapper-navbar">
      <Local />
      <NavLink to={RouteParths.WELCOME}>
        <button type="button">{state.strings.mainPage}</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
