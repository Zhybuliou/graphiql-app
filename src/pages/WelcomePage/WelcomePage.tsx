import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

import RoutePaths from '../../types/enums/routePaths';
import './WelcomePage.css';

function WelcomePage() {
  const [user] = useAuthState(auth);

  return (
    <div className="page-wrapper welcome">
      <h1>Welcome page</h1>
      {user ? (
        <NavLink to={RoutePaths.MAIN}>
          <button type="button">Go to MainPage - GraphiQL</button>
        </NavLink>
      ) : null}
      <div className="about-wrapper">
        <h2>General information about the developers, project, and course</h2>
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
