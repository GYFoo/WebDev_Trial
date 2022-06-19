const dbConn = require('../database');
const { POSTGRES_ERROR_CODES } = require('../database/error');
const { UserExistsError } = require('./error');

module.exports.create = (username, password) => {
    const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
    const params = [username, password];
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
};