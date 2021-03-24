import React from 'react';
import './MoviesCard.css';
import movieImage from '../../images/movieImage.jpeg';

const MoviesCard = ({  movie, savedMovies, addMovie, removeMovie, type, }) => {
  const {
    country, director, year, description, image, thumbnail,
    nameRU, nameEN, duration, trailer, movieId,
  } = movie;
  const handleClick = () => {
    window.open(trailer);
  };

  const handleSave = () => {
    addMovie({
      country: country || 'Не указано',
      director: director || 'Не указано',
      duration: duration || 0,
      year: year || 'Не указано',
      description: description || 'Не указано',
      image: image || movieImage,
      trailer: (trailer && trailer.startsWith('http')) ? trailer : 'https://youtube.com',
      thumbnail: thumbnail || 'https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png',
      nameRU: nameRU || 'Не указано',
      nameEN: nameEN || 'Не указано',
      movieId: movieId,
    });
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
        <p className="movie__title">{nameRU}</p>
        <span className="movie__duration">{time(duration)}</span>
      </div>
      <img className="movie__image" src={ image } alt={nameRU} onClick={handleClick} />
      {type === "saved-movies" ? (
        <button className="movie__button movie__saved-icon" onClick={ handleRemove }>
        </button>
      ) : savedMovies.some(
        (savedMovie) => savedMovie.movieId === movieId
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
