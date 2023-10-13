import { useEffect, useState } from 'react';
import FightZone from '../components/Fight/FightZone';
import Header from '../components/Header';
import { useApiClient } from '@/components/ApiClient';
import { MarvelCharacter } from '@/lib/api-client';

const Home = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();
  
  useEffect(() => {
    client.getCharactersFromDB().then((result) => setCharacters(result ?? []));
  }, [setCharacters, client]);

  return (
    <div className="p-8 max-w-[1000px] m-auto">
      <Header />
      <FightZone characters={characters} />
    </div>
  );
};

export default Home;
