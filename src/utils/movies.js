function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../images/movies', false, /\.(png|jpe?g|svg)$/));
const imagePaths = images.map((image) => image.default);
const title = 'В погоне за Бенкси';
const duration = '27 минут';
const moviesTemplate = [
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: true,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: true,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: true,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: false,
  },
  {
    title,
    duration,
    isSaved: false,
  },
];

export const movies = moviesTemplate.map((movie, index) => {
  const newMovie = { ...movie, image: imagePaths[index] };
  return newMovie;
});
export const moviesShort = movies.filter((movie) => movie.isSaved === true);
