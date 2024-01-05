import { PageWrapper } from '../../components/ui/PageWrapper';
import { useLocale } from '../../context/local';

function Page404() {
  const { state } = useLocale();
  return (
    <PageWrapper>
      <h1>{state.strings.page404Tittle}</h1>
    </PageWrapper>
  );
}

export default Page404;
