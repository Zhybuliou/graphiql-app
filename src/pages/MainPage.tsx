import { useLocale } from '../context/local';

function MainPage() {
  const { state } = useLocale();
  return (
    <div className="page-wrapper">
      <h1>{state.strings.mainPage}</h1>
    </div>
  );
}

export default MainPage;
