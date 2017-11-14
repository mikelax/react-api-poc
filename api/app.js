// @flow

const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require("express");
const staticFile = require('connect-static-file');

import index from 'routes/index';

import {Model} from 'objection';
import knex from 'services/knex';

const app = express();
app.set("port", process.env.PORT || 3001);

// wire misc things together

Model.knex(knex);

// set up basic middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(cors());

// set up basic routes
app.use('/silent', staticFile('static/silent.html'));
app.use('/api', index);

// Start server
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

export default app;
