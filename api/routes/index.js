const router = require('express').Router();

import security from 'middleware/security';
import Campaign from 'models/campaign';

router.get('/', (req, res, next) => {
  res.send('API Index');
});

// TODO may consider moving security.checkJwt to app middleware
// can use .unless function to whitelist certain APIs that shouldn't be checked
router.get('/test', security.checkJwt(), security.checkScopes(['read:messages']), (req, res) => {
  res.json({ name: 'mike' });
});

router.get('/test/db', security.checkJwt(), security.checkScopes(['read:messages']), (req, res) => {
  knex.select(knex.raw('current_timestamp as currdate'))
  .then(rows => {
    return rows[0].currdate;
  })
  .then(date => {
    res.json({ date: date });
  });
});

export default router;
