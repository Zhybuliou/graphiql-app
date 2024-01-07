import { useLocale } from '../../context/local';
import TeamCards from './TeamCards';

export default function TeamSection() {
  const { state } = useLocale();
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-2xl font-bold">
        {state.strings.welcomePageOurTeamTittle}
      </h2>
      <TeamCards />
    </div>
  );
}
