# Overview

This repo is a POC for a quickstart web project that is based off the [create-react-app](https://github.com/facebookincubator/create-react-app) starter project. That as used as a base with additional useful libraries and options enabled. The goal is to continue utilizing create-react-app without needign to [eject](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject). 

# Details

The repo is organized ito two separate projects, one for the React client, and the second as the backend server API. This is based off [this article](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) with some slight changes to the folder layout. I didn't want any coupling between the API and client, so they are in totally separate folders to allow zero cross-over, one can be totally replaced without knowledge to the other.

Start scripts/etc are currently not cross platform compatible. Current set up supports Mac OS / Linux. 

## How to run

The package.json file in the ROOT folder is present mainly to support npm scripts to run the development environment. 

`yarn start` - This starts both the API server and the react client webpac server. It utilizes [concurrently](https://github.com/kimmobrunfeldt/concurrently) to run both servers in parallel. 

## Additional Libraries & Integrations

- Server API powered by Express
- [Auth0](https://auth0.com/docs/quickstart/spa/react)
- [React](https://reacttraining.com/react-router/web/guides/philosophy) Router v4
- [React Bootstrap](https://react-bootstrap.github.io/)
- Auth0 automatic token renewal

# TODO

- [X] Integrate express as API server
- [ ] Enhance Auth0 integration with [SPA / API guide](https://auth0.com/docs/architecture-scenarios/application/spa-api) (ie. perms)
- [ ] Enhance [automatic token renewal](https://auth0.com/docs/quickstart/spa/react/05-token-renewal) implementation with better silient.html. Inject variables from server. Also currently redirects back to homepage.
- [ ] Secure API with [JWT verification](https://auth0.com/docs/jwks)
- [ ] Implement login page with [custom Lock](https://auth0.com/docs/libraries/lock/v10) implementation
- [ ] CSS preprocessor [integration](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
- [ ] flow - [Currently integrated](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow) but not fully covered
- [ ] Restart express server on code changes. Maybe [nodemon](https://github.com/remy/nodemon)
- [ ] CI/CD Set up
- [ ] Google Tag Manager / Google Analytics - Possible [page tracking option](https://www.pmg.com/blog/tracking-single-page-web-apps-google-tag-manager-analytics/)
- [ ] Better Handling of ENV variables for multiple environments


# Futher Reading

- https://auth0.com/docs/architecture-scenarios/application/spa-api
