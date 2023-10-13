import { FC, useEffect, useState } from 'react';
import Button from '../Atoms/Button';
import Avatar from '../Atoms/Avatar';
import SwordCross from 'mdi-react/SwordCrossIcon';
import { MarvelCharacter } from '@/lib/api-client';
import { useApiClient } from '../ApiClient';

type WinnerProps = {
  winner: MarvelCharacter;
  onRestore: () => void;
};

const Winner: FC<WinnerProps> = ({ winner, onRestore }) => {
  const client = useApiClient();
  const [{ lost, victories }, setScore] = useState<{ victories: number; lost: number }>({ lost: 0, victories: 0 });

  useEffect(() => {
    client.getCharacterScore(winner.id).then((result) => {
      setScore({ ...result });
    });
  }, [winner, client]);

  return (
    <>
      <div className="mt-10 flex flex-row justify-center">
        <div className="border-[1px] rounded-xl w-fit p-6 shadow-lg bg-gray-50">
          <div className="text-[32px] font-bold uppercase italic">Winner!!!</div>
          <div className="flex flex-row justify-center mt-4">
            <Avatar character={winner} />
          </div>
          <div className="text-center font-bold mb-4 underline underline-offset-2 mt-2">{winner.name}</div>
          <div className="grid grid-cols-2">
            <span>Victories :</span>
            <span>{victories}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Lost :</span>
            <span>{lost}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-10">
        <Button
          icon={SwordCross}
          label="New fight"
          onClick={onRestore}
        />
      </div>
    </>
  );
};

export default Winner;
