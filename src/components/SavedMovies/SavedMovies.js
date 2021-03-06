import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { moviesShort } from '../../utils/movies';

const isLoading = false;

const SavedMovies = () => (
  <>
    <Header>
      <Navigation />
    </Header>
    <SearchForm />
    <MoviesCardList movies={moviesShort} isRemovable />
    <Footer />
    {isLoading && <Preloader />}
  </>
);

export default SavedMovies;
