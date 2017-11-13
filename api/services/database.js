const config = require('../config/config');

const knex = require('knex')({
  client: 'pg',
  connection: config.PG_CONNECTION_STRING,
  searchPath: 'public',
  pool: { min: 0, max: 7 }
});

module.exports = knex;
