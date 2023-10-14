import { useApiClient } from "@/components/ApiClient";
import Ranking from "@/components/Ranking/Ranking";
import { MarvelCharacter } from "@/lib/api-client";
import { useEffect, useState } from "react";

const RankingPage = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();

  useEffect(() => {
    client.getCharactersByVotes().then((result) => setCharacters(result ?? []));
  }, [setCharacters, client]);

  return <Ranking characters={characters} />;
};

export default RankingPage;
