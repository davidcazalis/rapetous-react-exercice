import { FC, useState } from 'react';
import Avatar from '../Atoms/Avatar';
import { MarvelCharacter } from '@/lib/api-client';

type CharacterCardProps = {
  character: MarvelCharacter;
  onClick: () => void;
};

const FighterCard: FC<CharacterCardProps> = ({ character, onClick }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className={`p-5 border-[1px] rounded-xl bg-gray-50 ${isHover ? 'hover:shadow-2xl' : 'shadow-md'}`}>
      <div className="flex flex-row justify-center mb-4">
        <span
          className="cursor-pointer transform active:scale-75 transition-transform"
          onClick={onClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          <Avatar character={character} outlined size='large' />
        </span>
      </div>
      <div className={`text-center font-bold mb-4 ${isHover ? 'underline underline-offset-2' : ''}`}>{character.name}</div>
      <div className="text-justify italic">{character.description}</div>
    </div>
  );
};

export default FighterCard;
