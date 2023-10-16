import { useApiClient } from "@/components/ApiClient";
import Character from "./components/Character";
import { useState } from "react";
import { MarvelCharacter } from "@/lib/api-client";

function App() {
  const [fight, setFight] = useState(false);
  const [character, setCharacter] = useState<MarvelCharacter>();
  const [character2, setCharacter2] = useState<MarvelCharacter>();

  const client = useApiClient();
  client.getCharactersFromDB().then(console.log);

  function handleNewFight() {
    client.getRandomCharacter().then((data) => {setCharacter(data)});
    client.getRandomCharacter().then((data) => {setCharacter2(data)});

    setFight(true);
  }

  return <>

  <div>
  { fight && <Character character={character}/>}
  { fight && <Character character={character2}/>}
  </div>
  <button onClick={handleNewFight}>New fight</button>
  </>
}

export default App;
