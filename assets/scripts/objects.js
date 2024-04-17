const addMovieBtn = document.querySelector('#add-movie-btn');
const searchBtn = document.querySelector('#search-btn');

const movies = [];

const clearValues = () => {
  document.querySelector('#title').value = '';
  document.querySelector('#extra-name').value = '';
  document.querySelector('#extra-value').value = '';
};

const showMovies = (filterTitle = '') => {
  const movieList = document.querySelector('#movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  }

  movieList.classList.add('visible');
  movieList.innerHTML = '';

  const filtredMovies = !filterTitle
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filterTitle));

  filtredMovies.forEach((movie) => {
    const { info } = movie;
    const liEl = document.createElement('li');
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    // let text = `${getFormattedTitle.apply(movie,[])} - `;
    let text = `${getFormattedTitle.call(movie)} - `;
    for (const key in info) {
      if (key !== 'title') text += `${key}: ${info[key]}`;
    }
    liEl.textContent = text;
    movieList.appendChild(liEl);
  });
};

const addMovieHandler = () => {
  let title = document.querySelector('#title').value;
  let extraName = document.querySelector('#extra-name').value;
  let extraValue = document.querySelector('#extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    alert('please insert correct value for each input');
  } else {
    const newMovie = {
      info: {
        title,
        [extraName]: extraValue,
      },
      id: Math.random().toString(),
      getFormattedTitle() {
        return this.info.title.toUpperCase();
      },
    };

    movies.push(newMovie);
    console.log(movies);

    showMovies();
    clearValues();
  }
};

const searchMovieHandler = () => {
  const filterTitle = document.querySelector('#filter-title').value;
  showMovies(filterTitle);
  document.querySelector('#filter-title').value = '';
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

// const person = {
//     name: 'mehran',
//     age: 26,
//     interests: ['football', 'movies'],
//   };

// const person2 = { ...person, interests: [...person.interests] };
