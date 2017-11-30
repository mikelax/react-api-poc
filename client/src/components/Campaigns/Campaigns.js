import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CreateCampaign from './Create/CreateCampaign';
import ListCampaigns from './List/ListCampaigns';

export default class Campaigns extends Component {

  render() {
    const {match} = this.props;

    return (
      <div className="campaigns">
        <Route exact path={`${match.url}/create`} component={CreateCampaign}/>
        <Route exact path={`${match.url}`} component={ListCampaigns}/>
      </div>
    )
  }
}
