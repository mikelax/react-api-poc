import knex from 'services/knex';
import { checkJwt, checkScopes } from 'middleware/security';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('API Index');
});

// TODO may consider moving security.checkJwt to app middleware
// can use .unless function to whitelist certain APIs that shouldn't be checked
router.get('/test', checkJwt(), checkScopes(['read:messages']), (req, res) => {
  res.json({ name: 'mike' });
});

router.get('/test/db', checkJwt(), checkScopes(['read:messages']), (req, res) => {
  knex.select(knex.raw('current_timestamp as currdate'))
    .then(rows => rows[0].currdate)
    .then((date) => {
      res.json({ date });
    });
});

export default router;
