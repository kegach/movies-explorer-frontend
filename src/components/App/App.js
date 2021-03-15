import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './App.css';
import * as api from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { search, reformMovies } from '../../utils/utils';
import { fetchErrorMessage } from '../../utils/constants';
import errorImg from '../../images/error.svg';

const App = () => {
  const [isToken, setIsToken] = useState(false); 
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);

  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getUser();
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (err) {
        setCurrentUser({});
        setIsLoggedIn(false);
      } finally {
        setIsToken(true);
      }
    };
    getUser();
  }, []);
  
  useEffect(() => {
    const localMovies = localStorage.getItem("searchedMovies");
    if (isLoggedIn && localMovies) {
      setSearchedMovies(JSON.parse(localMovies));
      setIsFetched(true);
    }
  }, [isLoggedIn]);

  const handleLogin = async (userData) => {
    try {
      setIsFormDisabled(true);
      const user = await api.login(userData);
      setCurrentUser(user);
      setIsLoggedIn(true);
    } catch (err) {
      error(err.message);
    } finally {
      setIsFormDisabled(false);
    }
  };
  
  const handleRegister = async (userData) => {
    try {
      setIsFormDisabled(true);
      await api.register(userData);
      handleLogin({ email: userData.email, password: userData.password });
    } catch (err) {
      error(err.message);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const handleUpdateProfile = async (userData) => {
    try {
      setIsFormDisabled(true);
      const user = await api.updateProfile(userData);
      setCurrentUser(user);
    } catch (err) {
      error(err.message);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const handleSignout = async () => {
    try {
      await api.logout();
      setIsLoggedIn(false);
      setCurrentUser({});
      localStorage.clear();
      setSearchedMovies([]);
      setIsFetched(false);
    } catch (err) {
      error(err.message);
    }
  };

  const searchMovies = async (keyword, isIncludesShort) => {
    setIsLoading(true);
    setIsFetched(true);
    try {
      let movies = localStorage.getItem("movies");
      if (!movies) {
        const beatMovies = await moviesApi.getBeatMovies();
        const formatMovies = reformMovies(
          beatMovies,
          moviesApi.BASE_URL
        );
        localStorage.setItem("movies", JSON.stringify(formatMovies));
        movies = formatMovies;
      } else {
        movies = JSON.parse(movies);
      }
      const searchedMovies = search(movies, keyword, isIncludesShort);
      setSearchedMovies(searchedMovies);
      localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
    } catch (err) {
      error(fetchErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const getSavedMovies = async () => {
      try {
        const savedMovies = await api.getMovies();
        const savedMoviesIds = savedMovies.map(
          (movie) => movie.movieId
        );
        setSavedMovies(savedMovies);
        setSavedMoviesIds(savedMoviesIds);
        setSearchedSavedMovies(savedMovies);
      } catch (err) {
        error(err.message);
      }
    };
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn]);
  
  const searchSavedMovies = (keyword, isIncludesShort) => {
    const filteredSavedMovies = search(
      savedMovies,
      keyword,
      isIncludesShort
    );
    setSearchedSavedMovies(filteredSavedMovies);
  };
  
  const saveMovie = async (movieData) => {
    try {
      const savedMovie = await api.movie(movieData);
      setSavedMovies([...savedMovies, savedMovie]);
      setSavedMoviesIds([...savedMoviesIds, savedMovie.movieId]);
      setSearchedSavedMovies([...savedMovies, savedMovie]);
    } catch (err) {
      error(err.message);
    }
  };
  
  const removeMovie = async (movieId) => {
    try {
      const removedMovie = await api.removeMovie(movieId);
      const searchedMovies = savedMovies.filter(
        (movie) => movie.movieId !== removedMovie.movieId
      );
      const searchedMoviesIds = savedMoviesIds.filter(
        (id) => id !== removedMovie.movieId
      );
      setSavedMovies(searchedMovies);
      setSavedMoviesIds(searchedMoviesIds);
      setSearchedSavedMovies(searchedMovies);
    } catch (err) {
      error(err.message);
    }
  };

  const error = (msg) => {
    setMessage(msg);
    setInfoTooltipImage(errorImg);
    setIsInfoTooltipOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isToken && (
        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>
  
          <Route path="/signup">
            {!isLoggedIn ? (
              <Register
                onRegister={handleRegister}
                isFormDisabled={isFormDisabled}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
  
          <Route path="/signin">
            {!isLoggedIn ? (
              <Login onLogin={handleLogin} isFormDisabled={isFormDisabled} />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
  
          <ProtectedRoute path="/movies"
            isLoggedIn={isLoggedIn}
            isFetched={isFetched}
            isLoading={isLoading}
            component={Movies}
            searchMovies={searchMovies}
            movies={searchedMovies}
            saveMovie={saveMovie}
            removeMovie={removeMovie}
            savedMoviesIds={savedMoviesIds}
          />
  
          <ProtectedRoute path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            searchMovies={searchSavedMovies}
            movies={searchedSavedMovies}
            removeMovie={removeMovie}
            savedMoviesIds={savedMoviesIds}
          />
  
          <ProtectedRoute path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            onSignout={handleSignout}
            onUpdateProfile={handleUpdateProfile}
            isFormDisabled={isFormDisabled}
          />
  
          <Route path="*" component={NotFound} />
        </Switch>
      )}
  
      <InfoTooltip        
        message={message}
        image={infoTooltipImage}
        isOpen={isInfoTooltipOpen}
        setIsOpen={setIsInfoTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
  
  
};

export default App;
