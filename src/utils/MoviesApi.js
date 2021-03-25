const BASE_URL = 'https://api.nomoreparties.co';
const headers = {
  'Content-Type': 'application/json'
};

export function getBeatMovies() {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    headers,
    credentials: 'same-origin',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }); 
};