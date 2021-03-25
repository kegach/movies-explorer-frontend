import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {
  movies1Col,
  movies2Col,
  movies3Col,
  moviesPlus2,
  moviesPlus3,
} from "../../utils/utils";
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  movies,
  savedMovies,
  addMovie,
  removeMovie,
  type,
}) {
  const [moviesNow, setMoviesNow] = useState(0);
  const [moviesPlus, setMoviesPlus] = useState(0);
  const windowWidth = window.innerWidth;
  const location = window.location.pathname;
  let isDownload= false;
  useEffect(() => {
    if (location === "/movies") {
      if (windowWidth <= 480) {
        setMoviesNow(movies1Col);
        setMoviesPlus(moviesPlus2);
      } else if (windowWidth <= 768) {
        setMoviesNow(movies2Col);
        setMoviesPlus(moviesPlus2);
      } else {
        setMoviesNow(movies3Col);
        setMoviesPlus(moviesPlus3);
      }
    } else {
      setMoviesNow(movies.length);
    }
  }, [windowWidth, location, movies.length]);

  const handleMoreClick = () => {
    setMoviesNow(moviesNow + moviesPlus);
  };

  return (
    <section className="movies">
      {isDownload && <Preloader />}
      {!isDownload && movies.length === 0 && (
        <p className="movies__error">Ничего не найдено</p>
      )}
      {!isDownload && movies && (
        <ul className="movies__list">
          {movies.reduce((moviesToRender, movie) => {
            if (moviesToRender.length < moviesNow) {
              moviesToRender.push(
                <MoviesCard
                  movie={movie}
                  savedMovies={savedMovies}
                  key={movie.movieId}
                  addMovie={addMovie}
                  removeMovie={removeMovie}
                  type={type} />
              );
            }
            return moviesToRender;
          }, [])}
        </ul>
      )}
      {!isDownload && movies.length > moviesNow && (
        <button onClick={handleMoreClick} className="movies__more-button">
              Еще
        </button>
      )}
    </section>
  );
}



export default MoviesCardList;
