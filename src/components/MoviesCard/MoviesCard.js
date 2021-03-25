import React from 'react';
import './MoviesCard.css';
import movieImage from '../../images/movieImage.jpeg';

const MoviesCard = ({  movie, savedMovies, addMovie, removeMovie, type, }) => {

  const handleClick = () => {
    window.open(movie.trailer);
  };

  const handleSave = () => {
    addMovie(movie, type);
  };
  const handleRemove = () => {
    removeMovie( movie, type );
  };

  const time = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - 60 * hours;
    return `${hours} ч ${minutes} м`;
    ;
  };

  return (
    <li className="movie">
      <div className="movie__text-container">
        <p className="movie__title">{movie.nameRU}</p>
        <span className="movie__duration">{time(movie.duration)}</span>
      </div>
      <img className="movie__image" src={ movie.image ? movie.image : movieImage } alt={movie.nameRU} onClick={handleClick} />
      {type === "saved-movies" ? (
        <button className="movie__button movie__saved-icon" onClick={ handleRemove }>
        </button>
      ) : savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.movieId
      ) ? (
        <button className="movie__button movie__remove-icon" onClick={ handleRemove }>
        </button>
      ) : (
        <button className="movie__button" onClick={ handleSave }>
          {"Cохранить"}
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
