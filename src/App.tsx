import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ErrorNotFoundPage } from "./pages/404";
import { Header } from "./components/Header";
import { FightsPage } from "./pages/Fights";
import { CharactersPage } from "./pages/Characters";
import bg from "./assets/bg-dual.jpeg";
import clsx from "clsx";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={clsx("", {
        "text-white bg-cover bg-center font-body pt-[88px]": isHomePage,
      })}
      style={
        isHomePage
          ? {
              backgroundImage: `url(${bg})`,
            }
          : {}
      }
    >
      <div className="w-full absolute top-0">
        <Header />
      </div>
      <main className="container mx-auto px-4 relative z-10">
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
