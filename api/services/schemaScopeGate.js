import _ from 'lodash';
import config from 'config';

export default function(scopes, context, fn) {
  const { req } = context;
  const { user } = req;

  // allow graphiql queries
  if (config.get('graphql.graphiql')) {
    if (_.get(req, 'headers.referer', '').match('/graphiql?')) {
      return fn();
    }
  }

  if (!req.user || typeof user.scope !== 'string') {
    throw new Error('Invalid user or scopes within JWT');
  }

  const userScopes = user.scope.split(' ');
  const validScopes = _.intersection(userScopes, scopes);

  if (_.isEmpty(validScopes)) {
    throw new Error('Insufficient Scope Permission');
  } else {
    return fn();
  }
}
