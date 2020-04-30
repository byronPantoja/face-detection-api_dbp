const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
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
};

app.get('/', (req, res) => {
	res.send('This is wired up.');
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

app.listen(5000, () => {
	console.log('We are listening on port 5000');
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
