import { Link } from 'react-router-dom';

import { logout, useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';

import RoutePaths from '../../types/enums/routePaths';
import LocalToggle from '../local/LocalToggle';

import Button from '../ui/Button';

function Navbar() {
  const { state } = useLocale();
  const user = useUser();

  return (
    <div className="flex justify-end gap-1 p-2 shadow">
      <LocalToggle />
      {!user ? (
        <>
          <Link to={RoutePaths.SIGNIN}>
            <Button type="button">{state.strings.signIn}</Button>
          </Link>
          <Link to={RoutePaths.SIGNUP}>
            <Button type="button">{state.strings.signUp}</Button>
          </Link>
        </>
      ) : (
        <Button type="button" onClick={logout}>
          {state.strings.logOut}
        </Button>
      )}
      <Link to={RoutePaths.WELCOME}>
        <Button type="button"> {state.strings.mainPage}</Button>
      </Link>
    </div>
  );
}

export default Navbar;
