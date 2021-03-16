import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = ({
  movies,
  searchMovies,
  removeMovie,
  savedMoviesIds,
  isLoading,
}) => (
  <>
    <Header>
      <Navigation />
    </Header>
    <SearchForm searchMovies={searchMovies} />
    <MoviesCardList movies={movies}
      removeMovie={removeMovie}
      savedMoviesIds={savedMoviesIds}
      isLoading={isLoading}
    />
    <Footer />
  </>
);

export default SavedMovies;
