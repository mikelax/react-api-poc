import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Homepage</h1>
        </header>
      </div>
    );
  }
}
