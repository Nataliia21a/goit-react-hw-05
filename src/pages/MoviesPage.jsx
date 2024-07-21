import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchFilms } from "../films-api";
import { Oval } from "react-loader-spinner";
import MovieList from "../components/MovieList/MovieList";
import css from "../pages/MoviesPage.module.css";

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newOwner = evt.target.searchKeyWords.value;
    searchParams.set("owner", newOwner);
    setSearchParams(searchParams);
  };

  const ownerSearch = searchParams.get("owner") ?? "";

  useEffect(() => {
    if (ownerSearch.trim() === "") {
      setSearchParams();
      return;
    }
    async function fetchSearchFilms() {
      try {
        setLoader(true);
        setError(false);
        const data = await getSearchFilms(ownerSearch);
        setFilms(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchSearchFilms();
  }, [ownerSearch]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.inputSearch} type="text" name="searchKeyWords" />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
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
      {films.length > 0 && <MovieList films={films} />}
      {error && <p>Oh! There was an error, please reload the page...</p>}
    </>
  );
}
