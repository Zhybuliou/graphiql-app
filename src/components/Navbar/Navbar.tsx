import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase/firebase';

import RoutePaths from '../../types/enums/routePaths';
import Local from '../Local/Local';
import { useLocale } from '../../context/local';
import './navbar.css';

function Navbar() {
  const { state } = useLocale();
  const [user] = useAuthState(auth);

  return (
    <div className="wrapper-navbar">
      <Local />
      {!user ? (
        <>
          <NavLink to={RoutePaths.SIGNIN}>
            <button type="button">{state.strings.signIn}</button>
          </NavLink>
          <NavLink to={RoutePaths.SIGNUP}>
            <button type="button">{state.strings.signUp}</button>
          </NavLink>
        </>
      ) : null}

      <button
        disabled={Boolean(!user)}
        type="button"
        className="dashboard__btn"
        onClick={logout}
      >
        {state.strings.logOut}
      </button>
      <NavLink to={RoutePaths.WELCOME}>
        <button type="button">{state.strings.homePage}</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
