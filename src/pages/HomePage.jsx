import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingFilms } from "../films-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchTrendingFilms() {
      try {
        const data = await getTrendingFilms();
        setFilms(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrendingFilms();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {/* <ul>
        {films.map(({ original_title, id }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul> */}
      {films.length > 0 && <MovieList films={films} />}
    </>
  );
}
