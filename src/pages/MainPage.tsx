import { useLocale } from '../context/local';
import PageWrapper from '../components/ui/PageWrapper';
import Playground from '../components/playground/Playground';

function MainPage() {
  const { state } = useLocale();
  return (
    <PageWrapper>
      <h1>{state.strings.mainPage}</h1>
      <Playground />
    </PageWrapper>
  );
}

export default MainPage;
