const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: '',
		password: '',
		database: 'face-detection-db',
	},
});

db.select('*').from('users');

const app = express();

const database = {
	users: [
		{
			id: '001',
			name: 'John',
			email: 'jo.doe@gmoe.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '002',
			name: 'Jane',
			email: 'ja.doe@gmoe.com',
			password: 'cream',
			entries: 0,
			joined: new Date(),
		},
	],
	login: [
		{
			id: '187',
			hash: '',
			email: 'jo.doe@gmoe.com',
		},
	],
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('Error logging in.');
	}
});

app.post('/signup', (req, res) => {
	const { email, name, password } = req.body;
	db('users')
		.returning('*')
		.insert({
			name: name,
			email: email,
			joined: new Date(),
		})
		.then((user) => {
			res.json(user[0]);
		})
		.catch((err) => res.status(400).json(err)); //From knex documentation under Clear Methods: -insert
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*')
		.from('users')
		.where({
			id,
		})
		.then((user) => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('Not Found');
			}
		});
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});
