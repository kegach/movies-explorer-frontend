import React, { useState, useEffect }from 'react';
import './MoviesCard.css';
import movieImage from '../../images/movieImage.jpeg';

const MoviesCard = ({ movie, onSave, onRemove, savedMoviesIds }) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = movie;

  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (savedMoviesIds && savedMoviesIds.includes(movieId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [savedMoviesIds, movieId]);
  const handleClick = () => {
    window.open(trailer);
  };
  const handleSave = () => {
    onSave({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    });
  };
  const handleRemove = () => {
    onRemove({ movieId });
  };

  return (
    <li className="movie">
      <div className="movie__text-container">
        <p className="movie__title">{nameRU}</p>
        <span className="movie__duration">{duration}</span>
      </div>
      <img className="movie__image" src={image || movieImage} alt={nameRU} onClick={handleClick} />
      <button className={`movie__button ${isSaved && "movie__saved-icon"}`} onClick={!isSaved ? handleSave : handleRemove}>
        {!isSaved && "Cохранить"}
      </button>
    </li>
  );
};

export default MoviesCard;
