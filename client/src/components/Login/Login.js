import React, { Component } from 'react';
import Auth from '../../services/Auth/Auth';
import Auth0Lock from 'auth0-lock';
import './Login.css';

export default class Login extends Component {

  componentDidMount() {
    // Config documentation
    // https://auth0.com/docs/libraries/lock/v10/configuration#additionalsignupfields-array-
    const lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, {
      container: 'auth0Lock',
      oidcConformant: true,
      initialScreen: 'login',
      theme: {
        primaryColor: '#985e6d' // default #ea5323
      },
      languageDictionary: {
        title: 'Let\'s get started!'
      },
      auth: {
        redirectUrl: process.env.REACT_APP_AUTH0_REDIRECT_URI,
        responseType: 'token id_token',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        params: {
          scope: Auth.requestedScopes
        }
      }
    });

    lock.show();
  }

  render() {
    return (
      <div className="Login">
        <h1>
          Login
        </h1>
        <p>This page uses custom Auth0 Lock widget, as opposed to hosted login page.
        <br/>If you remove the container attribute it will display as a modal.</p>

        <div id="auth0Lock"></div>
      </div>
    );
  }
}
