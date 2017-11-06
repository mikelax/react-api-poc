import React, { Component } from 'react';
// import Auth from '../../services/Auth/Auth.js';
import './login.css';

export default class Login extends Component {
  render() {
    // const auth = new Auth();
    // auth.login();

    return (
      <div className="Login">
        <h1>
          Login
        </h1>
        <p>This page uses custom Auth0 Lock widget, as opposed to hosted login page</p>
      </div>
    );
  }
}
