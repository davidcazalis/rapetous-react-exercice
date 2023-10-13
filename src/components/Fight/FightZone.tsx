import FighterCard from './FighterCard';
import { FC, useCallback, useEffect, useState } from 'react';
import Button from '../Atoms/Button';
import RestoreIcon from 'mdi-react/RestoreIcon';
import Winner from './Winner';
import { MarvelCharacter } from '@/lib/api-client';
import { useApiClient } from '../ApiClient';

type FightZoneProps = {
  characters: MarvelCharacter[];
};

const FightZone: FC<FightZoneProps> = ({ characters }) => {
  const client = useApiClient();
  const [fighters, setFighters] = useState<MarvelCharacter[]>([]);
  const [winner, setWinner] = useState<MarvelCharacter | undefined>();

  const shuffle = useCallback(() => setFighters(characters.sort(() => Math.random() - Math.random()).slice(0, 2)), [characters]);
  const handleResult = async (winner: MarvelCharacter, loser: MarvelCharacter) => {
    await client.addVote(winner, loser);
    setWinner(winner);
  };

  useEffect(() => shuffle(), [shuffle]);

  return characters.length ? (
    <>
      {fighters.length && !winner && (
        <>
          <div className="mt-10 text-center text-[32px] font-bold uppercase italic">Who wins?!</div>
          <div className="flex flex-row justify-center pt-10">
            <Button
              icon={RestoreIcon}
              label="OSEF"
              onClick={() => shuffle()}
            />
          </div>

          <div className="flex flex-row mt-10">
            <span className="flex-1 grid">
              <FighterCard
                character={fighters[0]}
                onClick={() => handleResult(fighters[0], fighters[1])}
              />
            </span>
            <div className="text-center m-auto text-[32px] font-bold px-10">VS</div>
            <span className="flex-1 grid">
              <FighterCard
                character={fighters[1]}
                onClick={() => handleResult(fighters[1], fighters[0])}
              />
            </span>
          </div>
        </>
      )}
      {winner && (
        <Winner
          winner={winner}
          onRestore={() => {
            shuffle();
            setWinner(undefined);
          }}
        />
      )}
    </>
  ) : null;
};

export default FightZone;
