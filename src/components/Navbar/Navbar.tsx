import { NavLink } from 'react-router-dom';

import { logout, useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';

import RoutePaths from '../../types/enums/routePaths';
import Local from '../Local/Local';

import './navbar.css';

import Button from '../ui/button/Button';

function Navbar() {
  const { state } = useLocale();
  const user = useUser();

  return (
    <div className="wrapper-navbar">
      <Local />
      {!user && (
        <>
          <NavLink to={RoutePaths.SIGNIN}>
            <button type="button">{state.strings.signIn}</button>
          </NavLink>
          <NavLink to={RoutePaths.SIGNUP}>
            <button type="button">{state.strings.signUp}</button>
          </NavLink>
        </>
      )}
      <Button type="button" disabled onClick={logout}>
        {state.strings.logOut}
      </Button>
      <NavLink to={RoutePaths.WELCOME}>
        <Button type="button"> {state.strings.mainPage}</Button>
      </NavLink>
    </div>
  );
}

export default Navbar;
