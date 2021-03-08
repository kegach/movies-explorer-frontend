import React from 'react';
import './SearchForm.css';

const SearchForm = () => (
  <form className="search">
    <div className="search__container">
      <div className="search__search-container">
        <div className="search__input-container">
          <input className="search__input" placeholder="Фильм" required />
          <button className="search__button"></button>
        </div>
      </div>
      <div className="search__checkbox-container">
          <input className="search__checkbox" type="checkbox" id="switch" defaultChecked />
          <div className="search__checkbox-div" htmlFor="switch">
            <span className="search__checkbox-switch" />
          </div>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
    </div>
  </form>
);

export default SearchForm;
