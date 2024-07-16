import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsFilm } from "../../films-api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewFilm, setReviewFilm] = useState([]);

  useEffect(() => {
    async function fetchReviewsFilm() {
      const data = await getReviewsFilm(movieId);
      console.log(data);
      setReviewFilm(data.results);
    }
    fetchReviewsFilm();
  }, [movieId]);

  return (
    <div>
      {reviewFilm && reviewFilm.length > 0 ? (
        <ul>
          {reviewFilm.map((reviewItem) => (
            <li key={reviewItem.id}>
              <h4>Author: {reviewItem.author}</h4>
              <p>{reviewItem.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
