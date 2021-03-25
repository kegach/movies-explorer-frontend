const BASE_URL = "https://api.kegach-diplom.students.nomoredomains.rocks";
const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const API_CREDENTIALS = "include";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  async _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    const errorMessage = await res.json();
    return Promise.reject(new Error(`Ошибка: ${errorMessage.message}`));
  }

  async getMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
    return this._getRes(res);
  }

  async addMovie( movie ) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => {
      return this._getRes(res);
    });
  }

  async removeMovie( movie ) {
    return fetch(`${this._baseUrl}/movies/${movie.movieId}`, {
      method: "delete",
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => {
      return this._getRes(res);
    });
  }

  async getUser() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
    return this._getRes(res);
  }

  async updateProfile( name, email ) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
    return this._getRes(res);
  }

  async register( name, email, password ) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    return this._getRes(res);
  }

  async login( email, password ) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return this._getRes(res);
  }

  async signout() {
    const res = await fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    });
    return this._getRes(res);
  }
}

const api = new MainApi({
  baseUrl: BASE_URL,
  headers: API_HEADERS,
  credentials: API_CREDENTIALS,
});

export default api;