import { useState, useCallback, useEffect } from 'react';
import './SearchForm.css';
import checkbox from '../../images/check-box.svg';
import handleCheckbox from '../../images/check-box.svg';

function SearchForm({
  moviesData,
  getMovies,
  setSearchStatus,
  setCurrentMovies,
}) {
  const [keyword, setKeyword] = useState("");
  const [shortMovie, setShortMovie] = useState(true);
  const [isSearched, setIsSearched] = useState(false);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleShortMovieChange = useCallback(
    (e) => {
      setShortMovie(!shortMovie);
    },
    [shortMovie]
  );

  const handleMovieSearch = useCallback(
    (evt) => {
      if (evt) {
        evt.preventDefault();
      }
      setSearchStatus("search_searching");
      setTimeout(() => {
        getMovies(moviesData, keyword, shortMovie);
      }, 500);
    },
    [getMovies, setSearchStatus, moviesData, keyword, shortMovie]
  );

  useEffect(() => {
    if (isSearched) {
      handleMovieSearch();
    }
  }, [shortMovie]);

  useEffect(() => {
    setIsSearched(true);
    setSearchStatus("");
    setCurrentMovies([]);
  }, [setSearchStatus, setCurrentMovies]);
  
  return(
  <form className="search" onSubmit={handleMovieSearch}>
    <div className="search__container">
      <div className="search__search-container">
        <div className="search__input-container">
          <input className="search__input" placeholder="Фильм" onChange={handleKeywordChange} required />
          <button className="search__button"></button>
        </div>
      </div>
    <div className="search-checkbox" onClick={handleShortMovieChange}>
      <div className="search-checkbox__container">
        <img
          src={shortMovie ? checkbox : handleCheckbox}
          className="search-checkbox__checkbox"
          alt="Кнопка короткометражек"
        />
        <p className="search-checkbox__text">Короткометражки</p>
      </div>
    </div>
    </div>
  </form>
);
};

export default SearchForm;
