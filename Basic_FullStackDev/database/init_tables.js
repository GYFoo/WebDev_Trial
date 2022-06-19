// use 1 connection
process.env.NODE_ENV = 'test';
const dbConn = require('../database');

// query to create table in database
const query = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR unique not null,
        password VARCHAR not null
    )
`;

dbConn.query(query)
    .then((response) => {
        return console.log(`Executed ${response.length} queries successfully`);
    })
    .catch((error) => {
        return console.error(error);
    })
    .finally(() => {
        // end the database connection
        dbConn.end();
    });