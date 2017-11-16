// @flow

import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {Model} from 'objection';

import index from 'routes/index';
import knex from 'services/knex';
import schema from 'schemas';

const app = express();
app.set("port", process.env.PORT || 3001);
// set the view engine to ejs
app.set('view engine', 'ejs');

// set up helmet, basic security checklist
app.use(helmet({
  dnsPrefetchControl: false,
  hsts: false // TODO need dev to run under https first
}));

// wire misc things together

Model.knex(knex);

// set up basic middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(cors());

// graphql endpoints
// TODO add check scopes either on the whole endpoint or per endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

if (config.get('graphql.graphiql')) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// set up basic routes
app.use('/silent', (req, res) => {
  res.render('pages/silent', { 
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    domain: 'forgingadventures.auth0.com',
    redirectUri: 'http://localhost:3000'
  });
});
app.use('/api', index);

// Start server
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

export default app;
