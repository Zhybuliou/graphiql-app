import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { logout, useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';

import { RoutePaths } from '../../routes/routePaths';
import { LocalToggle } from '../localToggle/LocalToggle';

import { UiButton } from '../ui/UiButton';
import { cn } from '../../utils/cn';

export function Navbar() {
  const { state } = useLocale();
  const user = useUser();
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex sm:justify-end gap-2 p-1 sm:p-2 shadow bg-gray-50 flex-wrap justify-center',
        {
          'opacity-70 transition-all': isScroll,
        }
      )}
    >
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
        <>
          <UiButton type="button" onClick={logout}>
            {state.strings.logOut}
          </UiButton>
          <Link to={RoutePaths.MAIN}>
            <UiButton type="button">{state.strings.mainPage}</UiButton>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
