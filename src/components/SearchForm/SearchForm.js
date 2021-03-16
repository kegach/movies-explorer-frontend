import React, { useState, useRef } from 'react';
import './SearchForm.css';

const SearchForm = ({ searchMovies }) => {
  const [error, setError] = useState("");
  const [movie, setMovie] = useState("");
  const checked = useRef();
  const handleChange = (evt) => {
    setMovie(evt.target.value);
  };
  const handleCheckbox = () => {
    searchMovies(movie, checked.current.checked);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!movie) {
      setError("Ошибка, попробуйте подругому начать поиск!");
    } else {
      setError("");
      searchMovies(movie, checked.current.checked);
    }
  };
  
  return(
  <form className="search" onSubmit={handleSubmit}>
    <div className="search__container">
      <div className="search__search-container">
        <div className="search__input-container">
          <input className="search__input" placeholder="Фильм" value={movie} onChange={handleChange} required />
          <button className="search__button"></button>
        </div>
      </div>
      <div className="search__checkbox-container">
          <input className="search__checkbox" type="checkbox" id="switch" defaultChecked ref={checked} onChange={handleCheckbox} />
          <div className="search__checkbox-div" htmlFor="switch">
            <span className="search__checkbox-switch" />
          </div>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      <span className="search-form__error">{error}</span>
    </div>
  </form>
);
};

export default SearchForm;
