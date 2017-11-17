import config from 'config';

import logger from 'services/logger';

const knex = require('knex')({
  client: 'pg',
  connection: config.get('database.connection'),
  searchPath: config.get('database.searchPath'),
  pool: config.get('database.pool')
});

export default knex;

const times = {};

knex
  .on('query', (query) => {
    const uid = query.__knexQueryUid;
    times[uid] = {
      query,
      startTime: Date.now(),
    };
  })
  .on('query-response', (response, query) => {
    const uid = query.__knexQueryUid;

    const { startTime } = times[uid];
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    logger.info(query.sql, `- [${query.bindings ? query.bindings.join(',') : ''}] - ${elapsedTime.toFixed(3)} ms`);

    delete times[uid];
  });