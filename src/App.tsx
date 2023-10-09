import { useApiClient } from "./api-client";

function App() {
  const client = useApiClient();
  client.getCharactersFromDB().then(console.log);

  return <div>Hello World</div>;
}

export default App;
