const pool = require('../database');

const userDB = {
    addUser(username, fullname, email, password, callback) {
        const addUserQuery = 'INSERT INTO users3 (username, fullname, email, password) VALUES($1, $2, $3, $4) RETURNING userid, username, fullname, email, role, created_at';
        pool.query(addUserQuery, [username, fullname, email, password], (error, result) => {
            if (error) {
                // return the error
                return callback(error, null);
            }
            // no error
            // return the results
            return callback(null, result.rows[0]);
        });
    }, // -- end of addUser method
};

module.exports = userDB;
