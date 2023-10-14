import { Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ErrorNotFoundPage } from "./pages/404";
import { Header } from "./components/Header";
import { FightsPage } from "./pages/Fights";
import { CharactersPage } from "./pages/Characters";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="fights" element={<FightsPage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="*" element={<ErrorNotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
