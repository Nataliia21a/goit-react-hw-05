import Navigation from "../Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import MoviesPage from "../../pages/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import css from "../App/App.module.css";

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
