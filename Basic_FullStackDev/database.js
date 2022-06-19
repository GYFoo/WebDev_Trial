// handles database connection
require('dotenv').config();
const pg = require('pg');

if (process.env.NODE_ENV === 'test') {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
    });
    client.connect();
    module.exports = client;
} 
else {
    // manages a pool of connection
    const pool = new pg.Pool ({
        // url to the database
        connectionString: process.env.DATABASE_URL,
        // max no. of connections in this pool
        max: process.env.POOL_SIZE,
        // secure socket layer
        ssl: {
            rejectUnauthorized: true,
        },
    });
    module.exports = pool;
}

// for testing
// pool.query('SELECT NOW()')
//     .then((response) => {
//         console.log(response.rows[0].now);
//     })
//     .catch((error) => {
//         console.log(error);
//     });