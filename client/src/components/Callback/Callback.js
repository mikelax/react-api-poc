import React, { PureComponent } from 'react';
import loading from './logo.svg';

export default class Callback extends PureComponent {
  render() {
    return (
      <div>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}
