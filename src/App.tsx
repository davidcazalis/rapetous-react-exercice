import { useApiClient } from "@/components/ApiClient";

function App() {
  const client = useApiClient();
  client.getCharactersFromDB().then(console.log);

  return <div>Hello World</div>;
}

export default App;
