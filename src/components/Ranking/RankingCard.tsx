import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';
import Avatar from '../Atoms/Avatar';

type RankingCardProps = {
  character: MarvelCharacter;
  rank: number;
};

const RankingCard: FC<RankingCardProps> = ({ character, rank }) => {
  return (
    <div className="p-4 border-[1px] rounded-xl mb-4 flex flex-row items-center w-[400px] shadow-sm bg-slate-50 ">
      <div className="rounded-full border-[1px] w-[30px] h-[30px] border-black flex flex-col justify-center text-center mr-2 font-bold">{rank}</div>
      <Avatar
        character={character}
        dense
      />
      <div className="flex flex-col justify-center ml-4">
        <div className="text-[18px] font-bold">{character.name}</div>
        <div>Victory:&nbsp;&nbsp;&nbsp;{character.victories}</div>
        <div>Loss:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{character.lost}</div>
      </div>
    </div>
  );
};

export default RankingCard;
