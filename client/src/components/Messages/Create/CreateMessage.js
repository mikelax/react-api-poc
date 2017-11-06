// @flow

import React, { Component } from 'react';
import TestPing from './TestPing';

export default class CreateMessage extends Component<{||}> {

  render() {
    return (
      <div className="Create">
        <h1>
          Create New Message
        </h1>
        <TestPing auth={this.props.auth}></TestPing>
      </div>
    );
  }
}
