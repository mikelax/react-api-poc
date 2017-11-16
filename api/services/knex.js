import config from 'config';

const knex = require('knex')({
  client: 'pg',
  connection: config.get('database.connection'),
  searchPath: config.get('database.searchPath'),
  pool: config.get('database.pool')
});

knex.on('query', data => console.log('data', data));

export default knex;
