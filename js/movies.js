import { getIdMovie } from './movie.js';

const API_KEY = '2e022356';

const inputTextNode = document.getElementById('inputText');
const buttonSearchNode = document.getElementById('buttonSearch');
const movieListNode = document.getElementById('movieList');
const linkNode = document.getElementById('link');

const getInputValue = () => inputTextNode.value;

const getClickUser = () => {
	const inputValue = getInputValue();

	checkInputValue(inputValue);

	getApiMovies(inputValue);

	clearInput();
};

const checkInputValue = inputValue => {
	return inputValue.trim().length !== 0;
};

const getApiMovies = async inputValue => {
	try {
		const result = await fetch(
			`https://www.omdbapi.com/?s=${inputValue}&apikey=${API_KEY}`
		);

		const movies = await result.json();
		console.log(movies);

		renderMovies(movies);
	} catch (error) {
		console.log(error);
	}
};

const renderMovies = data => {
	movieListNode.innerHTML = '';

	if (data.Response === 'True') {
		data.Search.forEach(movie => {
			const TypeMovie = movie.Type === 'movie' ? 'Фильм' : '';
			const TypeSeries = movie.Type === 'series' ? 'Сериал' : '';
			const TypeGame = movie.Type === 'game' ? 'Игра' : '';

			movieListNode.innerHTML += `<li class="movie-app__item link-movie">
				<a
					class="link-movie__link-wrapper"
					target="_blank"
					href="label-movie.html?id=${movie.imdbID}"
				>
					<img
						class="link-movie__poster"
						src="${movie.Poster}"
						alt="логотип фильма ${movie.Title}"
					/>
					<div class="link-movie__wrapper-data">
						<h2 class="link-movie__title">${movie.Title}</h2>
						<p class="link-movie__year">
							${movie.Year}
						</p>
						<p class="link-movie__type">
							${TypeMovie}
							${TypeSeries}
							${TypeGame}
						</p>
					</div>
				</a>
			</li>`;
		});
	} else {
		console.log('Нет фильмов');
	}
};

const clearInput = () => {
	inputTextNode.value = '';

	inputTextNode.focus();
};

buttonSearchNode.addEventListener('click', getClickUser);


