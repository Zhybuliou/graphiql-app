function TeamCard({
  image,
  name,
  description,
}: {
  image: string;
  name: string;
  description: string;
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
      <img className="w-[300px] object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}
export default TeamCard;
