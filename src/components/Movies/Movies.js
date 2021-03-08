import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { movies } from '../../utils/movies.js';

const isLoading = false;

const Movies = () => (
  <>
  <section className="movies">
    <Header>
      <Navigation />
    </Header>
    <SearchForm />
    <MoviesCardList movies={movies} />
    <Footer />
    {isLoading && <Preloader />}
  </section>
  </>
);

export default Movies;
