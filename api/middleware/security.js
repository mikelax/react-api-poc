import _ from 'lodash';
import config from 'config';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export function checkJwt() {
  return jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://forgingadventures.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: 'https://api.forgingadventures.com',
    issuer: 'https://forgingadventures.auth0.com/',
    algorithms: ['RS256']
  });
}

export function checkJwtForGraphiql() {
  return (req, res, next) => {
    const graphiqlEnabled = config.get('graphql.graphiql');
    const graphiqlQuery = _.get(req, 'headers.referer', '').match('/graphiql?');

    if (graphiqlEnabled && graphiqlQuery) {
      next();
    } else {
      checkJwt()(req, res, next);
    }
  };
}

export function checkScopes(scopes) {
  return (req, res, next) => {
    if (!req.user || typeof req.user.scope !== 'string') {
      return nextError('Invalid user or scopes within JWT');
    }

    const tokenScopes = req.user.scope.split(' ');
    const validScopes = _.intersection(tokenScopes, scopes);

    if (_.isArray(validScopes) && validScopes.length >= 1) {
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

