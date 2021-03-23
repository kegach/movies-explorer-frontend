import React, { useState }from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import errorIm from '../../images/error.svg';

function Movies({
  moviesData,
  isDownload,
  currentMovies,
  savedMovies,
  getMovies,
  searchStatus,
  setSearchStatus,
  setCurrentMovies,
  addMovie,
  removeMovie,
}) { 
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  return (
  <>
    <Header>
      <Navigation />
    </Header>
    <SearchForm
        moviesData={moviesData}
        getMovies={getMovies}
        setSearchStatus={setSearchStatus}
        setCurrentMovies={setCurrentMovies}
      />
      {searchStatus === "Загрузка" && <Preloader />}
      {searchStatus === "Ошибка" && (
        <InfoTooltip        
        message={"Ошибка поиска"}
        image={errorIm}
        isOpen={isInfoTooltipOpen}
        setIsOpen={setIsInfoTooltipOpen}
      />
      )}
      {searchStatus === "Успешно" && (
        <MoviesCardList
          isDownload={isDownload}
          movies={currentMovies}
          savedMovies={savedMovies}
          addMovie={addMovie}
          removeMovie={removeMovie}
          type="all-movies"
        />
      )}
      <Footer />
    </>
  );
}

export default Movies;
