import _ from 'lodash';

export default function(scopes, context, fn) {
  const { req } = context;

  if (!req.user || typeof req.user.scope !== 'string') {
    throw new Error('Invalid user or scopes within JWT');
  }

  const userScopes = req.user.scope.split(' ');
  const validScopes = _.intersection(userScopes, scopes);

  if (_.isEmpty(validScopes)) {
    throw new Error('Insufficient Scope Permission');
  } else {
    return fn();
  }
}
