# Overview

This repo is a POC for a quickstart web project that is based off the [create-react-app](https://github.com/facebookincubator/create-react-app) starter project. That was used as a base with additional useful libraries and options enabled. The goal is to continue utilizing create-react-app without needing to [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject). 

# Details

This repo is organized into two separate projects, one for the React client, and the other as the backend server API. This is based off [this article](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) with some slight changes to the folder layout. I didn't want any coupling between the API and client, so they are in totally separate folders to allow zero cross-over. One can be totally replaced without knowledge to the other.

Start scripts/etc are currently not cross-platform compatible. Current set up supports Mac OS / Linux. 

## How to run - on the host

The package.json file in the ROOT folder is present mainly to support npm scripts to run the development environment. 

First the dependencies must be installed, run the following install commands:

```shell
yarn install
cd client && yarn install && cd ..
cd api && yarn install && cd ..
```

Edit [package.json](./client/package.json) and set `"proxy": "http://localhost:3001/"`

`yarn start` - This starts both the API server and the react client webpack server. It utilizes [concurrently](https://github.com/kimmobrunfeldt/concurrently) to run both servers in parallel in a single command window.

## How to run - using docker

Install [docker](https://www.docker.com/docker-mac)
NOTE: Config values for some container parameters (ie. db) are set up using [env files](https://docs.docker.com/compose/environment-variables/).

From the root folder run:

```shell
# Pull public postgres docker library
docker pull postgres

# only required for this first build or when a Dockerfile is edited
docker-compose build 

# to start both the api and client containers
docker-compose up
```

## Additional Libraries & Integrations

- Server API powered by Express
- [Auth0](https://auth0.com/docs/quickstart/spa/react)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy) v4
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Docker](https://www.docker.com/)
- [Postgres 9.6](https://www.postgresql.org/docs/9.6/static/index.html)
- [Webpack3](https://webpack.js.org/) with [babel](https://babeljs.io/) on the API for ES6/ES7 language features
- Auth0 automatic token renewal

# TODO

This is a basic TODO list of additional libraries and enhancements I want to add to this POC to get it closer to a true starting point for a new project. 

- [X] Integrate express as API server
- [ ] Enhance Auth0 integration with [SPA / API guide](https://auth0.com/docs/architecture-scenarios/application/spa-api)
    - perms - [Authorization Extension](https://auth0.com/docs/extensions/authorization-extension/v2). Create perms, assign to roles/groups, then create Rule to enforce scopes requested.
- [ ] Database migrations framework
    - knex
    - node-pg-migrate
    - db-migrate
    - node-db-migrate
- [ ] Enhance [automatic token renewal](https://auth0.com/docs/quickstart/spa/react/05-token-renewal) implementation with better silient.html. Inject variables from server. Also currently redirects back to homepage.
- [X] Secure API with [JWT verification](https://auth0.com/docs/jwks)
- [X] Implement login page with [custom Lock](https://auth0.com/docs/libraries/lock/v10) implementation
- [ ] CSS preprocessor [integration](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
- [ ] flow - [Currently integrated](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow) but not fully covered
- [X] Restart express server on code changes. Maybe [nodemon](https://github.com/remy/nodemon)
- [ ] CI/CD Set up
- [ ] Google Tag Manager / Google Analytics - Possible [page tracking option](https://www.pmg.com/blog/tracking-single-page-web-apps-google-tag-manager-analytics/)
- [ ] Better Handling of ENV variables for multiple environments


# Futher Reading

- https://auth0.com/docs/architecture-scenarios/application/spa-api
