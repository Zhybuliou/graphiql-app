import { Link } from 'react-router-dom';

import { useUser } from '../firebase/firebase';
import { useLocale } from '../context/local';
import RoutePaths from '../types/enums/routePaths';
import PageWrapper from '../components/ui/PageWrapper';
import UiButton from '../components/ui/UiButton';

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
      <div className="flex flex-col content-center items-center max-w-screen-md m-auto p-8 rounded-lg bg-cyan-400">
        <h2 className="mb-6">{state.strings.welcomePageTitle}</h2>
        <p className="p-4 bg-gray-50 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          maxime expedita, sunt id assumenda tenetur nobis asperiores vero illum
          aliquid cum, tempore itaque consequatur alias autem natus rem, ipsam
          impedit.
        </p>
      </div>
    </PageWrapper>
  );
}

export default WelcomePage;
