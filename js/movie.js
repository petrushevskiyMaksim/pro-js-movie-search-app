document.addEventListener('DOMContentLoaded', () => {
	const API_KEY = '2e022356';
	const params = new URLSearchParams(location.search);
	const apiId = params.get('id');

	const movieItem = document.getElementById('movie');

	const getIdMovie = async apiId => {
		try {
			const res = await fetch(
				`https://www.omdbapi.com/?apikey=${API_KEY}&i=${apiId}`
			);

			const movie = await res.json();

			renderMovie(movie);
		} catch (error) {
			console.log(error);
		}
	};

	getIdMovie(apiId);

	const renderMovie = movie => {
		movieItem.insertAdjacentHTML(
			'beforeend',
			`<div class="movie__card card-movie">
				<div class="card-movie__poster">
					<img class="card-movie__img" src="${movie.Poster}" alt="Картинка фильма ${movie.Title}" />
				</div>
				<div class="card-movie__info info-movie">
					<h3 class="info-movie__title">${movie.Title}</h3>
					<div class="info-movie__year">
						<h5 class="info-movie__year-title">Год:</h5>
						<p class="info-movie__year-text">${movie.Year}</p>
					</div>
					<div class="info-movie__rating">
						<h5 class="info-movie__rating-title">Рейтинг:</h5>
						<p class="info-movie__rating-text">${movie.imdbRating}</p>
					</div>
					<div class="info-movie__release">
						<h5 class="info-movie__release-title">Дата выхода:</h5>
						<p href="#" class="info-movie__release-text">${movie.Released}</p>
					</div>
					<div class="info-movie__duration">
						<h5 class="info-movie__duration-title">Продолжительность:</h5>
						<p href="#" class="info-movie__duration-text">${movie.Runtime}</p>
					</div>
					<div class="info-movie__genre">
						<h5 class="info-movie__genre-title">Жанр:</h5>
						<p href="#" class="info-movie__genre-text">${movie.Genre}</p>
					</div>
					<div class="info-movie__director">
						<h5 class="info-movie__director-title">Режиссер:</h5>
						<p href="#" class="info-movie__director-text">${movie.Director}</p>
					</div>
					<div class="info-movie__scenario">
						<h5 class="info-movie__scenario-title">Сценарий:</h5>
						<p href="#" class="info-movie__scenario-text"
							>${movie.Writer}</
						>
					</div>
					<div class="info-movie__actors">
						<h5 class="info-movie__actors-title">Актеры:</h5>
						<p href="#" class="info-movie__actors-text">${movie.Actors}</p>
					</div>
				</div>
			</div>
			<div class="card-movie__description">
				<h3 class="card-movie__description-title">Сюжет фильма:</h3>
				<p class="card-movie__description-text">
					${movie.Plot}
				</p>
			</div>`
		);
	};
});
