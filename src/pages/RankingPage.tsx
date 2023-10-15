import { useApiClient } from '@/components/ApiClient';
import Loader from '@/components/Atoms/Loader';
import Ranking from '@/components/Ranking/Ranking';
import { MarvelCharacter } from '@/lib/api-client';
import { useEffect, useState } from 'react';

const RankingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();

  useEffect(() => {
    client.getCharactersByVotes().then((result) => {
      setCharacters(result ?? []);
      setIsLoading(false);
    });
  }, [setCharacters, client]);

  return isLoading ? (
    <div className='flex flex-row justify-center pt-10'>
      <Loader />
    </div>
  ) : (
    <Ranking characters={characters} />
  );
};

export default RankingPage;
