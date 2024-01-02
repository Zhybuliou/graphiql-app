import { useLocale } from '../../context/local';
import TeamCard from './TeamCard';

export default function TeamCards() {
  const { state } = useLocale();
  const cards = [
    {
      image: '/spacepocket1985.png',
      name: state.strings.welcomePageOurTeamAlexName,
      description: state.strings.welcomePageOurTeamAlexDescription,
    },
    {
      image: '/TvaExperts.png',
      name: state.strings.welcomePageOurTeamTvaExpertsName,
      description: state.strings.welcomePageOurTeamTvaExpertsDescription,
    },
    {
      image: '/zhybuliou.jpg',
      name: state.strings.welcomePageOurTeamZhybuliouName,
      description: state.strings.welcomePageOurTeamZhybuliouDescription,
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {cards.map((card) => (
        <TeamCard key={card.name} {...card} />
      ))}
    </div>
  );
}
