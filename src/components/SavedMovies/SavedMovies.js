import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import errorIm from '../../images/error.svg';

function SavedMovies({
  moviesData,
  currentMovies,
  currentSavedMovies,
  savedMovies,
  getSavedMovies,
  getMovies,
  searchStatus,
  setSearchStatus,
  setCurrentMovies,
  addMovie,
  removeMovie,
}) { 
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  useEffect(() => { getSavedMovies() }, [getSavedMovies]);

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
          movies={
            currentMovies.length === 0 ? savedMovies : currentMovies
          }
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


export default SavedMovies;
