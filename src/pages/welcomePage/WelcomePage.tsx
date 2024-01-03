import { Link } from 'react-router-dom';

import { useUser } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import RoutePaths from '../../types/enums/routePaths';
import PageWrapper from '../../components/ui/PageWrapper';
import UiButton from '../../components/ui/UiButton';
import PresentationSection from './PresentationSection';
import TechnologiesSection from './TechnologiesSection';
import TeamSection from './TeamSection';

function WelcomePage() {
  const { state } = useLocale();
  const user = useUser();

  return (
    <PageWrapper className="relative">
      <h1>{state.strings.welcomePage}</h1>
      {user && (
        <Link to={RoutePaths.MAIN}>
          <UiButton type="button">{state.strings.goMainPage}</UiButton>
        </Link>
      )}
      <PresentationSection />
      <TechnologiesSection />
      <TeamSection />
    </PageWrapper>
  );
}

export default WelcomePage;
