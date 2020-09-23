import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

interface Movie {
	director: string;
	movie_name: string;
	genre: string;
	id: number;
	img_url: string;
	meta_score: number;
	movie_runtime: number;
	rating: string;
	release_year: number;
	summary: string;
	__createdtime: number;
	__updatedtime__: number;
}

const App: React.FC = () => {
	useEffect(() => {
		getAPI();
	}, []);

	const getAPI = () => {
		// Online Version
		const API = 'https://backend-meta-movies-oirgvhhej.vercel.app/';
		// Local Version
		// const API = 'http://localhost:8080/';

		fetch(API)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((apiData) => {
				console.log(apiData);

				setLoading(true);
				setMovieData(apiData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let [loading, setLoading] = useState<boolean>(true);
	let [movieData, setMovieData] = useState<Movie[]>([]);

	return (
		<Fragment>
			<header>
				<h1>Meta Movie Reviews</h1>
			</header>
			<main>
				{loading === false ? (
					<div>
						<h1>Loading...</h1>
					</div>
				) : (
					<section>
						{movieData.map((movie) => {
							let metaColor = 'low';

							if (movie.meta_score >= 70) {
								metaColor = 'high';
							} else if (movie.meta_score <= 69 && movie.meta_score >= 49) {
								metaColor = 'medium';
							} else {
								metaColor = 'low';
							}

							return (
								<div className="movie-container" key={String(movie.id)}>
									<h1>{movie.movie_name}</h1>
									<p>
										<strong>Director:</strong> {movie.director}
									</p>
									<p>
										<strong>Genre:</strong> {movie.genre}
									</p>
									<img src={movie.img_url} alt={movie.movie_name} />

									<p>
										<strong>Meta Score:</strong> <span className={metaColor}>{movie.meta_score}</span>
									</p>
									<p>
										<strong>Runtime:</strong> {movie.movie_runtime}
									</p>
									<p>
										<strong>Rating:</strong> {movie.rating}
									</p>
									<p>
										<strong>Release Year:</strong> {movie.release_year}
									</p>
									<p>{movie.summary}</p>
								</div>
							);
						})}
					</section>
				)}
			</main>
		</Fragment>
	);
};

export default App;
