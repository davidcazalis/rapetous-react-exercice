import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex justify-between py-6 px-4">
        <h1 className="font-extrabold text-white bg-red-600 p-2 uppercase">
          Baguarre
        </h1>
        <nav role="navigation">
          <ul className="flex gap-x-2">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
