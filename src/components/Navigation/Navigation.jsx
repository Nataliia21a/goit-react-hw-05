import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";

const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};

export default function Navigation() {
  return (
    <header>
      <nav>
        <NavLink className={makeNavLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={makeNavLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
