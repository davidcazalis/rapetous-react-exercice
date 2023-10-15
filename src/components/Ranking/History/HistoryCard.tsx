import Avatar from '@/components/Atoms/Avatar';
import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';

type HistoryCardProps = {
  character: MarvelCharacter;
};

const HistoryCard: FC<HistoryCardProps> = ({ character }) => {
  return (
    <div className="flex flex-row py-1">
      <Avatar
        character={character}
        size="dense"
      />
      <div className='ml-2 truncate'>{character.name}</div>
    </div>
  );
};

export default HistoryCard;
