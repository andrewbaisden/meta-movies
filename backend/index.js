const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const data = { operation: 'sql', sql: 'SELECT * FROM dev.movies' };

const config = {
	method: 'post',
	url: process.env.DATABASE_URL,
	headers: {
		Authorization: `Basic ${process.env.DATABASE_AUTH}`,
		'Content-Type': 'application/json',
	},
	data: data,
};

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	axios(config)
		.then((response) => {
			const data = response.data;
			console.log(data);
			res.json(data);
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/:movieId', (req, res) => {
	const movieId = req.params.movieId;
	console.log(movieId);

	const data = { operation: 'sql', sql: `SELECT * FROM dev.movies WHERE id = ${movieId}` };

	const config = {
		method: 'post',
		url: process.env.DATABASE_URL,
		headers: {
			Authorization: `Basic ${process.env.DATABASE_AUTH}`,
			'Content-Type': 'application/json',
		},
		data: data,
	};

	axios(config)
		.then((response) => {
			const data = response.data;
			console.log(data);
			res.json(data);
		})
		.catch((error) => {
			console.log(error);
		});
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
