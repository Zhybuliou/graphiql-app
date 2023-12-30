import { Link } from 'react-router-dom';

import { logout, useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';

import { RoutePaths } from '../../types/enums/routePaths';
import { LocalToggle } from '../local/LocalToggle';

import { UiButton } from '../ui/UiButton';

function Navbar() {
  const { state } = useLocale();
  const user = useUser();

  return (
    <div className="flex justify-end gap-1 p-2 shadow">
      <LocalToggle />
      {!user ? (
        <>
          <Link to={RoutePaths.SIGNIN}>
            <UiButton type="button">{state.strings.signIn}</UiButton>
          </Link>
          <Link to={RoutePaths.SIGNUP}>
            <UiButton type="button">{state.strings.signUp}</UiButton>
          </Link>
        </>
      ) : (
        <UiButton type="button" onClick={logout}>
          {state.strings.logOut}
        </UiButton>
      )}
      <Link to={RoutePaths.WELCOME}>
        <UiButton type="button"> {state.strings.mainPage}</UiButton>
      </Link>
    </div>
  );
}

export default Navbar;
