import { useLocale } from '../../context/local';

export default function PresentationSection() {
  const { state } = useLocale();
  return (
    <div className="flex flex-wrap p-4  max-w-screen-xl rounded-lg bg-[#EFF7FA]">
      <div className="text-start md:w-[50%]">
        <h2 className="text-2xl font-bold">
          {state.strings.welcomePagePresentationTitle}
        </h2>
        <p className="mt-3 mb-3">
          {state.strings.welcomePagePresentationDescriptionPartFirst}
        </p>
        <p>{state.strings.welcomePagePresentationDescriptionPartSecond}</p>
      </div>
      <img
        className="h-auto md:w-[50%]"
        src="/images/GraphQL.jpg"
        alt="graphql playground"
      />
    </div>
  );
}
