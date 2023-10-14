import { MarvelCharacter } from '@/lib/api-client';
import { useEffect, useState } from 'react';
import { useApiClient } from '../components/ApiClient';
import FightZone from '../components/Fight/FightZone';

const Fight = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();

  useEffect(() => {
    client.getCharactersFromDB().then((result) => setCharacters(result ?? []));
  }, [setCharacters, client]);

  return (
    <div className="px-[200px]">
      <FightZone characters={characters} />
    </div>
  );
};

export default Fight;
