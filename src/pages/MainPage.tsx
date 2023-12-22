import { useLocale } from '../context/local';
import PageWrapper from '../components/ui/PageWrapper';
import CodeEditor from '../components/codeEditor/CodeEditor';

function MainPage() {
  const { state } = useLocale();
  return (
    <PageWrapper>
      <h1>{state.strings.mainPage}</h1>
      <CodeEditor />
    </PageWrapper>
  );
}

export default MainPage;
