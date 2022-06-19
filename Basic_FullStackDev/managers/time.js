// import the database connection
const dbConn = require('../database');

module.exports.now = () => {
    return dbConn.query('SELECT NOW()')
    .then((response) => {
        const now = response.rows[0].now;
        return now;
    })
    .catch((error) => {
        console.log(error);
    });
};