import { useLocale } from '../context/local';

import PageWrapper from '../components/ui/pageWrapper/PageWrapper';

function MainPage() {
  const { state } = useLocale();
  return (
    <PageWrapper>
      <h1>{state.strings.mainPage}</h1>
    </PageWrapper>
  );
}

export default MainPage;
