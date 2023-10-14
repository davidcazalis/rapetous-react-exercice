import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const HeaderLink: FC<{ children: ReactNode; to: string }> = ({
  children,
  to,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "font-bold uppercase bg-white p-2 border-4 border-black text-black transition-all",
          {
            "bubble-shadow bg-yellow-400 ": isActive,
          }
        )
      }
    >
      <span>{children}</span>
    </NavLink>
  );
};

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex justify-between py-6 px-4 font-body items-center relative z-10">
        <h1 className="bg-red-500 text-white font-display uppercase py-2 px-4 font-bold text-2xl">
          Bagarre!
        </h1>
        <nav role="navigation">
          <ul className="flex gap-x-4">
            <li>
              <HeaderLink to="/">Home</HeaderLink>
            </li>
            <li>
              <HeaderLink to="characters">Characters</HeaderLink>
            </li>
            <li>
              <HeaderLink to="fights">Fights</HeaderLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
