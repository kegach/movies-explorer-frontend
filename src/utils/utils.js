export const movies1Col = 5;
export const movies2Col = 10;
export const movies3Col = 12;
export const moviesPlus2 = 2;
export const moviesPlus3 = 3;

export const reformMovies = (movies, BASE_URL) =>
  movies.map((movie) => {
    const newMovie = {
      ...movie,
      movieId: movie.id,
      image: movie.image ? BASE_URL + movie.image.url : "",
      thumbnail: movie.image
        ? BASE_URL + movie.image.formats.thumbnail.url
        : "",
      trailer: movie.trailerLink,
    };
    return newMovie;
  });

export const search = (movies, keyword = "", isIncludesShort) => {
  const minimum = isIncludesShort ? 0 : 40;
  return movies.filter(
    (movie) =>
      (keyword
        ? movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        : true) && movie.duration > minimum
  );
};