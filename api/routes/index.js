const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('API Index');
});

// TODO add middleware for JWT verification
// https://auth0.com/docs/jwks
router.get('/test', (req, res) => {
  res.json({ name: 'mike' });
})

module.exports = router;
