const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

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
			id: '987',
			hash: '',
			email: 'don@gmoe.com',
		},
	],
};


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json('success');
	} else {
		res.status(400).json('Error logging in.');
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
	});
	database.users.push({
		id: '003',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	});
	res.json(database.users[database.users.length - 1]); //length -1 grabs the last item in the array
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.post('/image', (req, res) => {
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


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(3000, () => {
	console.log('We are listening on port 3000');
});

/**
 *
 * -->res = this is working
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 *
 **/
