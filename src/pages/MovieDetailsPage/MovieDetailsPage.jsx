import {
  NavLink,
  Link,
  useParams,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
import { getDetailsFilm } from "../../films-api";
import css from "../../pages/MovieDetailsPage/MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filmDetails, setFilmDetails] = useState(null);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    async function fetchDetailsFilm() {
      try {
        setLoader(true);
        setError(false);
        const data = await getDetailsFilm(movieId);
        setFilmDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchDetailsFilm();
  }, [movieId]);

  const location = useLocation();

  const urlBackLinkRef = useRef(location.state ?? "/movies");

  return (
    <div>
      <Link to={urlBackLinkRef.current}>Go back</Link>
      {loader && (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="rgb(1, 1, 242)"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {filmDetails && (
        <div>
          <img
            className={css.filmPoster}
            src={
              filmDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`
                : defaultImg
            }
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
      {error && <p>Oh! There was an error, please reload the page...</p>}
    </div>
  );
}
