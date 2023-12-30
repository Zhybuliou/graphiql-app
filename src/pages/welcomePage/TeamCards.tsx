import TeamCard from './TeamCard';

export default function TeamCards() {
  const cards = [
    {
      image: '/public/spacepocket1985.png',
      name: 'spacepocket1985',
      description: 'Description 1',
    },
    {
      image: '/public/TvaExperts.png',
      name: 'TvaExperts',
      description: 'Description 2',
    },
    {
      image: '/public/zhybuliou.jpg',
      name: 'Zhybuliou',
      description: 'Description 3',
    },
  ];
  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card) => (
        <TeamCard key={card.name} {...card} />
      ))}
    </div>
  );
}
