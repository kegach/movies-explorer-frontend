const BASE_URL = "https://api.kegach-diplom.students.nomoredomains.rocks";
const headers = {
  'Content-Type': 'application/json'
};

export function register( name, email, password ) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name, 
      email, 
      password, 
    }),
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});  
}

export function login( email, password ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});  
}

export function signout() {
  return fetch(`${BASE_URL}/signout`, {
    headers,
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});  
}

export function getUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});   
}

export function updateProfile( name, email ) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      email,
    }),
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });  
}

export function getMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
      headers,
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });   
}

export function addMovie({
  country, director, duration, year, description,
  image, trailer, thumbnail, nameRU, nameEN, movieId,
}) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
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
      }),
    credentials: 'include',
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });  
}

export function removeMovie( { movieId }) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
      headers,
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });   
}


