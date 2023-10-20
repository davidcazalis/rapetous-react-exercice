import { MarvelCharacter } from '@/lib/api-client';
import { FC, useEffect, useState } from 'react';
import { useApiClient } from '../ApiClient';
import Loader from '../Atoms/Loader';
import { Avatar, Card, CardContent } from '@mui/material';

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
    <div className="flex flew-row justify-center mt-10">
      <Card
        className="inline-block p-2 !bg-zinc-50"
        variant="outlined">
        <CardContent>
          <div className="text-[32px] font-bold uppercase italic">Winner!!!</div>
          <div className="flex flew-row justify-center mt-2">
            <Avatar
              src={winner.image_url ?? ''}
              sx={{ width: 120, height: 120 }}
            />
          </div>
          <div className="text-center font-bold mb-4 underline underline-offset-2 mt-2">{winner.name}</div>
          <div className="grid grid-cols-2">
            <span>Victories :</span>
            {!isLoading && <span className="ml-2">{victories}</span>}
            {isLoading && <Loader />}
          </div>
          <div className="grid grid-cols-2">
            <span>Lost :</span>
            {!isLoading && <span className="ml-2">{lost}</span>}
            {isLoading && <Loader />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Winner;
