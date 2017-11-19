import React from 'react';
import ReactDOM from 'react-dom';
import 'auth0-js/build/auth0.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


registerServiceWorker();
