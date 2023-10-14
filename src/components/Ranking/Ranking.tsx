import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';
import RankingCard from './RankingCard';

type RankingProps = {
  characters: MarvelCharacter[];
};

const sortCharacters = (a: MarvelCharacter, b: MarvelCharacter) => {
  if ((a.victories ?? 0) < (b.victories ?? 0)) return 1;
  if ((a.victories ?? 0) > (b.victories ?? 0)) return -1;
  if ((a.lost ?? 0) > (b.lost ?? 0)) return 1;
  if ((a.lost ?? 0) < (b.lost ?? 0)) return -1;
  return 0;
};

const Ranking: FC<RankingProps> = ({ characters }) => {
  return (
    characters && (
      <div className="pt-10 flex flex-row flex-wrap justify-around [&>:nth-child(1)]:bg-green-500 [&>:nth-child(2)]:bg-green-400 [&>:nth-child(3)]:bg-green-300 [&>:nth-last-child(1)]:bg-red-500 [&>:nth-last-child(2)]:bg-red-400 [&>:nth-last-child(3)]:bg-red-300">
        {characters
          .sort((a, b) => sortCharacters(a, b))
          .map((character, index) => (
            <RankingCard
              key={character.id}
              character={character}
              rank={index + 1}
            />
          ))}
      </div>
    )
  );
};

export default Ranking;
