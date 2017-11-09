const router = require('express').Router();
const security = require('../middleware/security');

router.get('/', (req, res, next) => {
  res.send('API Index');
});

// TODO may consider moving security.checkJwt to app middleware
// can use .unless function to whitelist certain APIs that shouldn't be checked
router.get('/test', security.checkJwt(), security.checkScopes(['read:messages']), (req, res) => {
  res.json({ name: 'mike' });
})

module.exports = router;
