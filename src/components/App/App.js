import React, { useState, useEffect, useCallback } from 'react';
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
import errorIm from '../../images/error.svg';
import successIm from '../../images/success.svg';

const App = () => {
  const [isToken, setIsToken] = useState(false); 
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formReset, setFormReset] = useState(false);
    
  const [allMovies, setAllMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

  const [isFetched, setIsFetched] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState('');
  
  const getUser = useCallback(async () => {
    try {
      const user = await api.getUser();
      setCurrentUser({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", true);
    } catch (err) {
      setCurrentUser({});
      setIsLoggedIn(false);
      errorSuccess(err.message, errorIm);
    } finally {
      setIsToken(true);
    }
  }, []);
  
  const loadMovies = useCallback(async () => {
    if (localStorage.getItem("movies")) {
      const localData = JSON.parse(localStorage.getItem("movies"));
      setAllMovies(localData);
    } else {
      try {
        const movies = await moviesApi.getBeatMovies();
        const loadedMovies = movies.map((movie) => ({
          country: movie.country ? movie.country : "--",
          director: movie.director ? movie.director : "--",
          duration: movie.duration ? movie.duration : 0,
          year: movie.year ? movie.year : "--",
          description: movie.description ? movie.description : "--",
          image: movie.image ? `https://api.nomoreparties.co${movie.image.url}` : "--",
          trailer: movie.trailerLink ? movie.trailerLink: "https://api.kegach-diplom.students.nomoredomains.rocks/not-found",
          thumbnail: movie.image ? `https://api.nomoreparties.co${movie.image.url}` : "--",
          movieId: movie.id ? movie.id : 0,
          nameRU: movie.nameRU ? movie.nameRU : "--",
          nameEN: movie.nameEN ? movie.nameEN : "--",
        }));
        setAllMovies(loadedMovies);
        saveToLocalStorage(loadedMovies);
      } catch (err) {
        errorSuccess(err.message, errorIm);
      }
    }
  }, []);

  const saveToLocalStorage = (movies) => {
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem("movies");
  };

  const getCurrentMovies = useCallback(
    async (movies, key, shorts) => {
      setIsDownload(true);
      try {
      if (allMovies.length === 0) {
        setSearchStatus("Ошибка");
        return;
      }
      if (key.length === 0) {
        setSearchStatus("Ошибка");
        errorSuccess("Попробуйте другое ключевое слово...", errorIm);
        return;
      }
      const moviesToFilter = movies.filter(
        (film) =>
          (film.nameRU.toLowerCase().includes(key.toLowerCase()) 
          || film.nameEN.toLowerCase().includes(key.toLowerCase())) 
            && ((shorts && film.duration <= 40) 
               || (!shorts && film.duration > 40))
      );
      setCurrentMovies(moviesToFilter);
      if (moviesToFilter.length > 0) {
        setSearchStatus("Успешно");
      } else {
        errorSuccess("Ничего не найдено", errorIm);
        setSearchStatus("Ошибка");
      } 
    } finally {
      setIsDownload(false);
    }
    },
    [allMovies]
  );

  const getSavedMovies = useCallback(async () => {
    try {
      const savedMovies = await api.getMovies();
      setSavedMovies(savedMovies);
      setCurrentSavedMovies(savedMovies);
    } catch (err) {
      errorSuccess(err.message, errorIm);
    }
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await api.login( email, password );
      setFormReset(true);
      setCurrentUser(user);
      if (user._id) {
        getUser();
      }
      setIsLoggedIn(true);
    } catch (err) {
      errorSuccess(err.message, errorIm);
    } finally {
      setFormReset(false);
    }
  };
  
  const handleRegister = async ({ name, email, password }) => {
    try {
      await api.register( name, email, password );
      setFormReset(true);
      handleLogin({ 
        email: email, 
        password: password 
      });
    } catch (err) {
      errorSuccess(err.message, errorIm);
    } finally {
      setFormReset(false);
    }
  };

  const handleUpdateProfile = async ({ name, email }) => {
    try {
      setFormReset(true);
      const user = await api.updateProfile( name, email );
      setCurrentUser({
        name: user.name,
        email: user.email,
      });     
      errorSuccess("Успешно", successIm);
    } catch (err) {
      errorSuccess(err.message, errorIm);
    } finally {
      setFormReset(false);
    }
  };

  const handleSignout = async () => {
    try {
      await api.signout();
      setIsLoggedIn(false);
      setCurrentUser({
        name: "",
        email: "",
        _id: null,
      });
      setCurrentMovies([]);
      setSavedMovies([]);
      localStorage.removeItem("loggedIn");
      removeFromLocalStorage();
      localStorage.clear();
      setIsFetched(false);
    } catch (err) {
      errorSuccess(err.message, errorIm);
    }
  };

  const addMovie = useCallback ( 
    async (movie) => {
    console.log(movie);
    try {
      const newMovie = await api.addMovie(movie);
      setSavedMovies([newMovie, ...savedMovies]);
    } catch (err) {
      errorSuccess(err.message, errorIm);
    }
  },
  [savedMovies]
);
  
  const removeMovie = useCallback( 
     async (movie, type) => {
      try {
      const removedMovie = await api.removeMovie(movie);
      const updatedSavedMovies = savedMovies.filter(
        (movie) => movie.movieId !== removedMovie.movieId
      );
      setSavedMovies(updatedSavedMovies);
      if (type === "saved-movies") {
        const updatedCurrentMovies = currentMovies.filter(
          (movie) => movie.movieId !== removedMovie.movieId
        );
        setCurrentMovies(updatedCurrentMovies);
      }
    } catch (err) {
      errorSuccess(err.message, errorIm);
    }
  },
    [savedMovies, currentMovies]
  );

  const errorSuccess = (message, image) => {
    setMessage(message);
    setInfoTooltipImage(image);
    setIsInfoTooltipOpen(true);
  };

  useEffect(() => {
    loadMovies();
    getUser();
  }, [loadMovies, getUser]);

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
                formReset={formReset}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
  
          <Route path="/signin">
            {!isLoggedIn ? (
              <Login 
                onLogin={handleLogin} 
                formReset={formReset} />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
  
          <ProtectedRoute path="/movies"
            isLoggedIn={isLoggedIn}
            isFetched={isFetched}
            isDownload={isDownload}
            component={Movies}
            moviesData={allMovies}
            currentMovies={currentMovies}
            savedMovies={savedMovies}
            getMovies={getCurrentMovies}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
            setCurrentMovies={setCurrentMovies}
            addMovie={addMovie}
            removeMovie={removeMovie}
        
          />
  
          <ProtectedRoute path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            moviesData={savedMovies}
            currentMovies={currentMovies}
            currentSavedMovies={currentSavedMovies}
            savedMovies={savedMovies}
            getSavedMovies={getSavedMovies}
            getMovies={getCurrentMovies}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
            setCurrentMovies={setCurrentMovies}
            addMovie={addMovie}
            removeMovie={removeMovie}
          />
  
          <ProtectedRoute path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            searchStatus={"Успешно"}
            currentUser={currentUser}
            onSignout={handleSignout}
            onUpdateProfile={handleUpdateProfile}
            formReset={formReset}
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
