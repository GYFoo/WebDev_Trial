const express = require('express');
const app = express();
const { now } = require('./managers/time');

// basic route
app.get('/', (req, res) => {
    res.json({ hello: 'world' });
});

// route to get the current time
app.get('/now', (req, res) => {
    now().then((time) => {
        return res.json({ now: time });
    })
});

module.exports = app;