import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastFilm } from "../../films-api";
import css from "../MovieCast/MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [castFilm, setCastFilm] = useState([]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    async function fetchCastFilm() {
      const data = await getCastFilm(movieId);
      setCastFilm(data.cast);
    }
    fetchCastFilm();
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {castFilm.map((castItem) => (
        <li className={css.castItem} key={castItem.cast_id}>
          <img
            className={css.castImg}
            src={
              castItem.profile_path
                ? `https://image.tmdb.org/t/p/w500${castItem.profile_path}`
                : defaultImg
            }
            alt={castItem.name}
          />
          <h4>{castItem.name}</h4>
          <p>Character: {castItem.character}</p>
        </li>
      ))}
    </ul>
  );
}
