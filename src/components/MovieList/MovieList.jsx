import { Link, useLocation } from "react-router-dom";
import css from "../MovieList/MovieList.module.css";

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <ul>
      {films.map((film) => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`} state={location}>
            {film.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
