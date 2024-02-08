const TYPE_GAME = 'game';
const GAME = 'Игра';
const TYPE_MOVIE = 'movie';
const MOVIE = 'Фильм';
const TYPE_SERIES = 'series';
const SERIES = 'Сериал';
const API_KEY = '&apikey=2e022356';
const NON_MOVIE = 'Фильмы не найдены';

const inputTextNode = document.getElementById('inputText');
const buttonSearchNode = document.getElementById('buttonSearch');
const movieListNode = document.getElementById('movieList');
const linkNode = document.getElementById('link');

const getNameMovieFromUser = () => {
	const valueInput = inputTextNode.value.trim();

	if (valueInput === '') {
		return (movieListNode.innerText = 'Фильмы не найдены');
	}

	return valueInput;
};

function getDataMovies(valueInput) {
	valueInput = getNameMovieFromUser();

	const url = `https://www.omdbapi.com/?s=${valueInput}${API_KEY}`;

	fetch(url)
		.then(response => response.json())
		.then(result => {
			const resArr = result['Search'];

			const resObj = resArr[0];

			createMovieHTML(resObj);

			renderList(resArr);
		})
		.catch(error => console.log(error));
}

function createMovieHTML(resObj) {
	const TYPE_IF_MOVIE = resObj.Type === TYPE_MOVIE ? MOVIE : '';
	const TYPE_IF_SERIES = resObj.Type === TYPE_SERIES ? SERIES : '';
	const TYPE_IF_GAME = resObj.Type === TYPE_GAME ? GAME : '';

	return `<li class="movie-app__item link-movie">
				<a
					class="link-movie__link-wrapper"
					target="_blank"
					href="http://img.omdbapi.com/?i=tt0232500&apikey=2e022356&"
				>
					<img
						class="link-movie__poster"
						src="${resObj.Poster}"
						alt="логотип фильма ${resObj.Title}"
					/>
					<div class="link-movie__wrapper-data">
						<p class="link-movie__title">
							<a href="http://img.omdbapi.com/?i=tt0232500&apikey=2e022356&" target="_blank">${resObj.Title}</a>
						</p>
						<p class="link-movie__year">
							<a href="#">${resObj.Year}</a>
						</p>
						<p class="link-movie__type">
							<a class="link-movie__type" href="#">
								${TYPE_IF_MOVIE}
								${TYPE_IF_SERIES}
								${TYPE_IF_GAME}
							</a>
						</p>
					</div>
				</a>
			</li>`;
}

const renderList = resArr => {
	movieListNode.innerHTML = '';

	resArr.forEach(element => {
		const html = createMovieHTML(element);
		movieListNode.innerHTML += html;
	});
};

inputTextNode.addEventListener('input', () => {
	getDataMovies();
});

// const params = new URLSearchParams(location.search);
// console.log(params);

// const id = params.get('id');
// console.log(id);

/*apikey=2e022356&*/
