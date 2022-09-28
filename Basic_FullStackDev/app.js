const express = require('express');
const cors = require('cors');
const { UserExistsError, PasswordMismatchError, NoSuchUserError } = require('./managers/error');
const app = express();
app.use(cors());
const { now } = require('./managers/time');
const userManager = require('./managers/users');
const jwtManager = require('./managers/jwt');
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

app.post('/sessions', (req, res, next) => {
    const { username, password } = req.body;
    return userManager
        .compare(username, password)
        .then(() => {
            return jwtManager.create(username);
        })
        .then((token) => {
            return res.status(201).json({ token });
        })
        .catch((error) => {
            if (error instanceof PasswordMismatchError) {
                return next(createHttpError(401, error.message));
            } else if (error instanceof NoSuchUserError) {
                return next(createHttpError(404, error.message));
            } else {
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