const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = `postgresql://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/panda-whale-group`;

// create new pool using connection string
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    // display SQL query in console upon execution
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
