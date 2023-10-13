import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ErrorNotFoundPage } from "./pages/404";
import { Header } from "./components/Header";
import { FightsPage } from "./pages/Fights";
import { CharactersPage } from "./pages/Characters";
import { motion } from "framer-motion";
import bg from "./assets/bg-dual.jpeg";
import clsx from "clsx";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={clsx("bg-cover bg-center font-body", {
        "pt-[88px] relative": isHomePage,
      })}
    >
      {isHomePage && (
        <motion.div
          initial={{ opacity: 0.8, scale: 1.2, filter: "blur(2px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 20,
            ease: "easeOut",
            repeatDelay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full absolute top-0 left-0 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
      )}
      <div
        className={clsx({
          "w-full absolute top-0": isHomePage,
        })}
      >
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
