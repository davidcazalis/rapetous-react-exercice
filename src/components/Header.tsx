import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
