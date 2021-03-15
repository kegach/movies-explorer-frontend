import fetchApi from './fetchApi';
export const BASE_URL = 'https://api.nomoreparties.co';
export const getBeatMovies = () => fetchApi({
  BASE_URL, path: 'beatfilm-movies', credentials: 'same-origin',
});