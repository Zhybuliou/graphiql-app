import { NavLink } from 'react-router-dom';

import { useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import RoutePaths from '../../types/enums/routePaths';
import './WelcomePage.css';
import PageWrapper from '../../components/ui/pageWrapper/PageWrapper';

function WelcomePage() {
  const { state } = useLocale();
  const user = useUser();

  return (
<<<<<<< HEAD
    <div className="page-wrapper welcome">
      <h1>{state.strings.welcomePage}</h1>
      {user ? (
        <NavLink to={RoutePaths.MAIN}>
          <button type="button">{state.strings.goMainPage}</button>
        </NavLink>
      ) : null}
      <div className="about-wrapper">
        <h2>{state.strings.welcomePageTitle}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          maxime expedita, sunt id assumenda tenetur nobis asperiores vero illum
          aliquid cum, tempore itaque consequatur alias autem natus rem, ipsam
          impedit.
        </p>
      </div>
    </div>
=======
    <PageWrapper>
      <div className="welcome">
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
    </PageWrapper>
>>>>>>> 3373c5d (refactor: add page wrapper)
  );
}

export default WelcomePage;
