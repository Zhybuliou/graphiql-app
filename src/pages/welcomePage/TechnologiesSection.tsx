import { useLocale } from '../../context/local';
import ImageComponent from './ImageComponent';

export default function TechnologiesSection() {
  const { state } = useLocale();
  return (
    <div className="mt-8 mb-8 p-4  max-w-screen-xl">
      <h2 className="text-2xl font-bold">
        {state.strings.welcomePageTechnologiesTittle}
      </h2>
      <ImageComponent />
    </div>
  );
}
