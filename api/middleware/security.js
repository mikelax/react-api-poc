const _ = require('lodash');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = {
  checkJwt: function() {
    return jwt({
      // Dynamically provide a signing key
      // based on the kid in the header and 
      // the singing keys provided by the JWKS endpoint.
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://forgingadventures.auth0.com/.well-known/jwks.json`
      }),

      // Validate the audience and the issuer.
      audience: 'https://api.forgingadventures.com',
      issuer: `https://forgingadventures.auth0.com/`,
      algorithms: ['RS256']
    });
  },

  checkScopes: function(scopes) {
    return function(req, res, next) {
      if (!req.user || typeof req.user.scope !== 'string') {
        return nextError('Invalid user or scopes within JWT');
      }

      const tokenScopes = req.user.scope.split(' ');
      const validScopes = _.intersection(tokenScopes, scopes);

      if(_.isArray(validScopes) && validScopes.length >= 1) {
        next();
      } else {
        nextError(new Error('Insufficient Scope Permission'));
      }

      function nextError(err) {
        err.status = 401;
        return next(err);
      }
    };
  }
}
