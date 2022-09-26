const dbConn = require('../database');
const bcrypt = require('bcrypt');
const { POSTGRES_ERROR_CODES } = require('../database/error');
const { UserExistsError } = require('./error');

function hashPassword(password) {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS);
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