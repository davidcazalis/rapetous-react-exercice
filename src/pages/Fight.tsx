import { MarvelCharacter } from '@/lib/api-client';
import { useEffect, useState } from 'react';
import { useApiClient } from '../components/ApiClient';
import FightZone from '../components/Fight/FightZone';
import Loader from '@/components/Atoms/Loader';

const Fight = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();

  useEffect(() => {
    client.getCharactersFromDB().then((result) => {
      setCharacters(result ?? []);
      setIsLoading(false);
    });
  }, [setCharacters, client]);

  return isLoading ? (
    <div className="flex flex-row justify-center pt-10">
      <Loader />
    </div>
  ) : (
    <div className="px-[200px]">
      <FightZone characters={characters} />
    </div>
  );
};

export default Fight;
