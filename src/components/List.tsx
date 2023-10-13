import { useEffect, useState } from 'react';
import { MarvelCharacter, useApiClient } from '../api-client';
import Avatar from './Avatar';

const List = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const client = useApiClient();

  useEffect(() => {
    client.getCharactersFromDB().then((result) => setCharacters(result?.sort((a, b) => a.name.localeCompare(b.name)) ?? []));
  });

  return (
    <div className="grid grid-cols-8">
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex flex-row align-middle mb-1">
          <Avatar character={character} />
          <span className="self-center ml-2">{character.name}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
