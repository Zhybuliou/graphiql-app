import { Link } from 'react-router-dom';

import { useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import RoutePaths from '../../types/enums/routePaths';
import './WelcomePage.css';
import PageWrapper from '../../components/ui/pageWrapper/PageWrapper';
import Button from '../../components/ui/button/Button';

function WelcomePage() {
  const { state } = useLocale();
  const user = useUser();

  return (
    <PageWrapper>
      <div className="welcome">
        <h1>{state.strings.welcomePage}</h1>
        {user ? (
          <Link to={RoutePaths.MAIN}>
            <Button type="button">{state.strings.goMainPage}</Button>
          </Link>
        ) : null}
        <div className="about-wrapper">
          <h2>{state.strings.welcomePageTitle}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            maxime expedita, sunt id assumenda tenetur nobis asperiores vero
            illum aliquid cum, tempore itaque consequatur alias autem natus rem,
            ipsam impedit.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default WelcomePage;
