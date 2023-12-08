import { NavLink } from 'react-router-dom';

import { UseUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import RoutePaths from '../../types/enums/routePaths';
import './WelcomePage.css';

function WelcomePage() {
  const { state } = useLocale();
  const user = UseUser();

  return (
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
  );
}

export default WelcomePage;
