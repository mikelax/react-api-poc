import config from 'config';

export default require('knex')({
  client: 'pg',
  connection: config.get('database.connection'),
  searchPath: config.get('database.searchPath'),
  pool: config.get('database.pool')
});
