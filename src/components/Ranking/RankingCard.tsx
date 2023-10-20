import { MarvelCharacter } from '@/lib/api-client';
import Avatar from '@mui/material/Avatar';
import { FC, useState } from 'react';

type RankingCardProps = {
  character: MarvelCharacter;
  onClick: () => void;
  rank: number;
};

const RankingCard: FC<RankingCardProps> = ({ character, onClick, rank }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        className={`p-4 border-[1px] rounded-xl mb-4 flex flex-row items-center w-[400px] shadow-sm bg-slate-50 cursor-pointer ${isHover ? 'shadow-xl border-gray-400' : ''}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}>
        <div className="rounded-full border-[1px] w-[30px] h-[30px] border-black flex flex-col justify-center text-center mr-2 font-bold">{rank}</div>
        <Avatar
          src={character.image_url ?? ''}
          sx={{ width: 80, height: 80 }}
        />
        <div className="flex flex-col justify-center ml-4">
          <div className="text-[18px] font-bold">{character.name}</div>
          <div>Victory:&nbsp;&nbsp;&nbsp;{character.victories}</div>
          <div>Loss:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{character.lost}</div>
        </div>
      </div>
    </>
  );
};

export default RankingCard;