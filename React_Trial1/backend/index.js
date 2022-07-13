// includes
const express = require('express');
const cors = require('cors');
// import pool from database.js
const pool = require('./database');

const Users = require('./model/users');

// initialize
const app = express();
const PORT = process.env.PORT || 3001;

// setting up the app
app.use(cors());
app.use(express.json());

// required to read post > body else req.body is empty
app.use(express.urlencoded({ extended: false }));

// display that the server is running
// basic route /
app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});

// GET method
app.get('/api', async (req, res) => {
    console.log(req.query);
    res.json(req.query);
});

// POST method
app.post('/api', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

// setting up the database
const CREATE_TABLE_SQL = `
    CREATE TABLE messages (
        id SERIAL primary key,
        message VARCHAR not null
    );
`;

app.post('/api/table', async (req, res) => {
    pool.query(CREATE_TABLE_SQL)
    .then(() => {
        res.send('Table created');
    })
    .catch((error) => {
        res.send(error);
    });
});

// clearing the database
const DROP_TABLE_SQL = `
    DROP TABLE IF EXISTS messages;
`;

app.delete('/api/table', async (req, res) => {
    pool.query(DROP_TABLE_SQL)
    .then(() => {
        res.send('Table dropped');
    })
    .catch((error) => {
        res.send(error);
    });
});

// post message to post a message to the database
app.post('/api/message', async (req, res) => {
    try {
        console.log(req.body);
        const { message } = req.body;
        const newInsert = await pool.query('INSERT INTO messages (message) VALUES ($1) RETURNING *', [message]);
        res.json(newInsert);
    } catch (err) {
        console.error(err.message);
    }
});

// get method to retrieve all messages from the database
app.get('/api/message', async (req, res) => {
    try {
        console.log(req.query);
        const allMessage = await pool.query('SELECT * FROM messages');
        res.json(allMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// setting up the users table in the database
// query to create users table
const CREATE_USERS_TABLE = `
    CREATE TABLE users3  (
        userid SERIAL NOT NULL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(45) NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
`;

app.post('/users/table', async (req, res) => {
    pool.query(CREATE_USERS_TABLE)
    .then(() => {
        res.send('Table created');
    })
    .catch((error) => {
        res.send(error);
    });
});

app.post('/users/', (req, res) => {
    const { username } = req.body;
    const { fullname } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    // supply the 5 parameters retrieved by the caller of the web service
    Users.addUser(username, fullname, email, password, (err, result) => {
        if (!err) {
            // send the result back to the user
            res.status(201).send({ 'User added with these data': result });
        } else {
            // if error code = 23505, send the error result
            // eslint-disable-next-line no-lonely-if
            if (err.code === '23505') {
                res.status(409).send('{"Result":"username or email provided already exists"}');
            } else {
                console.log(err);
                // else the error is unknown
                res.status(500).send('{"Result":"Internal Server Error"}');
            }
        }
    });
});

// make the app listen
app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});
