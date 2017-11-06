// @flow

import React, { Component } from 'react';
import axios from 'axios';

export default class TestPing extends Component<{||}> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  securedPing = () => {
    const { getAccessToken } = this.props.auth;
    const API_URL = 'http://localhost:3000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/test`, { headers })
      .then(response => this.setState({ name: response.data.name }))
      .catch(error => this.setState({ message: error.message }));
  }

  componentWillMount() {
    this.securedPing();
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <p>API Response is {name}</p>
      </div>
    );
  }
}
