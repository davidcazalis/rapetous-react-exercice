import { MarvelCharacter } from '@/lib/api-client';
import { FC, useEffect, useState } from 'react';
import { useApiClient } from '../ApiClient';
import Avatar from '../Atoms/Avatar';
import Loader from '../Atoms/Loader';

type WinnerProps = {
  winner: MarvelCharacter;
  onRestore: () => void;
};

const Winner: FC<WinnerProps> = ({ winner, onRestore }) => {
  const client = useApiClient();
  const [{ lost, victories }, setScore] = useState<{ victories: number; lost: number }>({ lost: 0, victories: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.getCharacterScore(winner.id).then((result) => {
      setScore({ ...result });
      setIsLoading(false);
      setTimeout(onRestore, 5000);
    });
  }, [winner, client, onRestore]);

  return (
    <>
      <div className="mt-10 flex flex-row justify-center">
        <div className="border-[1px] rounded-xl w-fit p-6 shadow-lg bg-gray-50">
          <div className="text-[32px] font-bold uppercase italic">Winner!!!</div>
          <div className="flex flex-row justify-center mt-4">
            <Avatar character={winner} size='large' />
          </div>
          <div className="text-center font-bold mb-4 underline underline-offset-2 mt-2">{winner.name}</div>
          <div className="grid grid-cols-2">
            <span>Victories :</span>
            {!isLoading && <span>{victories}</span>}
            {isLoading && <Loader />}
          </div>
          <div className="grid grid-cols-2">
            <span>Lost :</span>
            {!isLoading && <span>{lost}</span>}
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Winner;
