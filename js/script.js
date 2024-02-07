const TYPE_GAME = 'game';
const GAME = 'Игра';
const TYPE_MOVIE = 'movie';
const MOVIE = 'Фильм';
const TYPE_SERIES = 'series';
const SERIES = 'Сериал';

const inputTextNode = document.getElementById('inputText');
const buttonSearchNode = document.getElementById('buttonSearch');
const movieListNode = document.getElementById('movieList');
const linkNode = document.getElementById('link');

const movies = [];

function getDataMovies() {
	const valueInput = inputTextNode.value;

	const url = `https://www.omdbapi.com/?s=${valueInput}&apikey=2e022356`;

	fetch(url)
		.then(response => response.json())
		.then(result => {
			const res = result['Search'];
			console.log(res);

			const newRes = res[0];
			console.log(newRes);

			getMovieHTML(newRes);

			render(res);
		})
		.catch(error => console.log(error));
}

function getMovieHTML(newRes) {
	const TYPE_IF_MOVIE = newRes.Type === TYPE_MOVIE ? MOVIE : '';
	const TYPE_IF_SERIES = newRes.Type === TYPE_SERIES ? SERIES : '';
	const TYPE_IF_GAME = newRes.Type === TYPE_GAME ? GAME : '';

	return `<li class="movie-app__item link-movie">
				<a
					class="link-movie__link-wrapper"
					target="_blank"
					href="http://img.omdbapi.com/?i=tt0232500&apikey=2e022356&"
				>
					<img
						class="link-movie__poster"
						src="${newRes.Poster}"
						alt="логотип фильма ${newRes.Title}"
					/>
					<div class="link-movie__wrapper-data">
						<p class="link-movie__title">
							<a href="http://img.omdbapi.com/?i=tt0232500&apikey=2e022356&" target="_blank">${newRes.Title}</a>
						</p>
						<p class="link-movie__year">
							<a href="#">${newRes.Year}</a>
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

const render = res => {
	movieListNode.innerHTML = '';

	res.forEach(element => {
		const html = getMovieHTML(element);
		movieListNode.innerHTML += html;
	});
};

inputTextNode.addEventListener('input', () => {
	getDataMovies();
});

movieListNode.addEventListener('click', () => {});
// const params = new URLSearchParams(location.search);
// console.log(params);

// const id = params.get('id');
// console.log(id);

/*apikey=2e022356&*/
