const pg = require('knex')({
  client: 'pg',
  // connection: process.env.PG_CONNECTION_STRING,
  connection: 'postgresql://postgres@db:5432/postgres',
  searchPath: 'public',
  pool: { min: 0, max: 7 }
});

module.exports = pg;
