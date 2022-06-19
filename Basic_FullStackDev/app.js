const express = require('express');
const { UserExistsError } = require('./managers/error');
const app = express();
const { now } = require('./managers/time');
const userManager = require('./managers/users');
const createHttpError = require('http-errors');
const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// basic route
app.get('/', (req, res) => {
    res.json({ hello: 'world' });
});

// route to get the current time
app.get('/now', (req, res) => {
    now().then((time) => {
        return res.json({ now: time });
    });
});

// create a new user route
app.post('/users', (req, res, next) => {
    // const username = req.body.username;
    // const password = req.body.password;
    // destructuring
    const { username, password } = req.body;
    // send to the database
    userManager.create(username, password)
        .then(() => {
            return res.sendStatus(201);
        })
        .catch((error) => {
            if (error instanceof UserExistsError) {
                return next(createHttpError(409, error.message));
            }
            else {
                return next(error);
            }
        });
});

// error handler
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json({ "error": error.message || 'Unknown Error!' });
});

module.exports = app;