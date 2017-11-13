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
    axios.all([
      axios.get(`${API_URL}/test`, { headers }),
      axios.get(`${API_URL}/test/db`, { headers })
    ])
    .then(axios.spread((resp1, resp2) => {
      this.setState({ name: resp1.data.name });
      this.setState({ dbDate: resp2.data.date })
    }))
    .catch(error => this.setState({ message: error.message }));
  }

  componentWillMount() {
    this.securedPing();
  }

  render() {
    const { name, dbDate } = this.state;
    return (
      <div>
        <p>API Response is {name}</p>
        <p>DB Date is {dbDate}</p>
      </div>
    );
  }
}
