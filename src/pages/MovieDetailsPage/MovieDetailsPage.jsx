import { NavLink, useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailsFilm } from "../../films-api";
import css from "../../pages/MovieDetailsPage/MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [filmDetails, setFilmDetails] = useState(null);

  useEffect(() => {
    async function fetchDetailsFilm() {
      const data = await getDetailsFilm(movieId);
      setFilmDetails(data);
    }
    fetchDetailsFilm();
  }, [movieId]);

  return (
    <div>
      <button>Go back</button>
      {filmDetails && (
        <div>
          <img
            className={css.filmPoster}
            src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
            alt={filmDetails.title}
          />
          <h3>{filmDetails.title}</h3>
          <p>User Score: {(filmDetails.vote_average * 10).toFixed(2)}%</p>
          <h3>Owerview</h3>
          <p>{filmDetails.overview}</p>
          <h3>Genres</h3>
          <p>
            {filmDetails.genres.map((filmGenre) => filmGenre.name).join(" ")}
          </p>
        </div>
      )}
      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
