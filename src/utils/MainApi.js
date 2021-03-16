import fetchApi from "./fetchApi";

export const BASE_URL = "https://api.kegach-diplom.students.nomoredomains.rocks";


export const register = ({ name, email, password }) =>
  fetchApi({
    BASE_URL,
    path: "signup",
    method: "POST",
    body: { name, email, password },
  });

export const login = ({ email, password }) =>
  fetchApi({
    BASE_URL,
    path: "signin",
    method: "POST",
    body: { email, password },
  });

export const logout = () =>
  fetchApi({
    BASE_URL,
    path: "signout",
  });

export const getUser = () =>
  fetchApi({
    BASE_URL,
    path: "users/me",
  });

export const updateProfile = ({ name, email }) =>
  fetchApi({
    BASE_URL,
    path: "users/me",
    method: "PATCH",
    body: { name, email },
  });

export const getMovies = () =>
  fetchApi({
    BASE_URL,
    path: "movies",
  });

export const movie = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  thumbnail,
  nameRU,
  nameEN,
  movieId,
}) =>
  fetchApi({
    BASE_URL,
    path: "movies",
    method: "POST",
    body: {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    },
  });

export const removeMovie = ({ movieId }) =>
  fetchApi({
    BASE_URL,
    path: `movies/${movieId}`,
    method: "DELETE",
  });

