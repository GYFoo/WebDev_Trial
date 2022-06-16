/* Include to use .env file */
require('dotenv').config();

const pg = require('pg');

// DATABASE_URL extracted from .env file
const dbConfig = { connectionString: process.env.DATABASE_URL };

// CONNECTION TO DB
const pool = new pg.Pool({
    ...dbConfig,
    max: process.env.MAX_CONNECTION || 5,
});

module.exports = pool;