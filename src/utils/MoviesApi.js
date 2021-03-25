const BASE_URL = "https://api.kegach-diplom.students.nomoredomains.rocks";
const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const API_CREDENTIALS = "include";


class MoviesApi {
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

  async getBeatMovies() {
    const res = await fetch(this._baseUrl);
    return this._getRes(res);
  }
}

const movieApi = new MoviesApi({
  baseUrl: BASE_URL,
  headers: API_HEADERS,
  credentials: API_CREDENTIALS,
});

export default movieApi;