const dbConn = require('../database');
const bcrypt = require('bcrypt');
const { POSTGRES_ERROR_CODES } = require('../database/error');
const { UserExistsError, NoSuchUserError, PasswordMismatchError } = require('./error');

function hashPassword(password) {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS);
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

function insertIntoDatabase(username, hash) {
    const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    const params = [username, hash];
    return dbConn.query(query, params)
        .catch((error) => {
            // error (user exist or someother error)
            if (error.code === POSTGRES_ERROR_CODES.UNIQUE_VIOLATION) {
                throw new UserExistsError(username);
            } 
            else {
                console.log(error);
                throw error;
            }
        });
}

module.exports.create = (username, password) => {
    return hashPassword(password).then((hash) => insertIntoDatabase(username, hash));
};

function getUserByUsername(username) {
    const query = `SELECT password FROM users WHERE username = $1`;
    const params = [username];
    return dbConn.query(query, params).then((response) => {
        if (response.rows.length === 0) {
            // no such user
            throw new NoSuchUserError(username);
        }
        return response.rows[0].password;
    });
}

module.exports.compare = (username, password) => {
    return getUserByUsername(username)
    .then((hash) => {
        return comparePassword(password, hash);
    })
    .then((isMatched) => {
        if (!isMatched) {
            throw new PasswordMismatchError(username);
        }
        return;
    });
}