// handles database connection
require('dotenv').config();
const pg = require('pg');

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

// for testing
// pool.query('SELECT NOW()')
//     .then((response) => {
//         console.log(response.rows[0].now);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// export the pool
module.exports = pool;