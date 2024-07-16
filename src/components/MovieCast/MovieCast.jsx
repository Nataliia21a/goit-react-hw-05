import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastFilm } from "../../films-api";
import css from "../MovieCast/MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [castFilm, setCastFilm] = useState([]);

  useEffect(() => {
    async function fetchCastFilm() {
      const data = await getCastFilm(movieId);
      setCastFilm(data.cast);
    }
    fetchCastFilm();
  }, [movieId]);

  return (
    <ul>
      {castFilm.map((castItem) => (
        <li key={castItem.cast_id}>
          <img
            className={css.castImg}
            src={`https://image.tmdb.org/t/p/w500${castItem.profile_path}`}
            alt={castItem.name}
          />
          <h4>{castItem.name}</h4>
          <p>Character: {castItem.character}</p>
        </li>
      ))}
    </ul>
  );
}
