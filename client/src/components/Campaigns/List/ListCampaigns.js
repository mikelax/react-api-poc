import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';

import { campaignsQuery } from '../queries';

class ListCampaigns extends Component {

  render() {
    const {match} = this.props;

    return <div className="campaigns-list">
      <h1>Campaigns</h1>

      <Link to={`${match.url}/create`}>
        Create a new Campaign
      </Link>

      {this.content()}
    </div>
  }

  content = () => {
    const { data: { loading, error, campaigns } } = this.props;

    switch(true) {
      case loading:
        return <p>Loading...</p>;
      case error:
        return <p>Error!</p>;
      default:
        return <ul>
          {campaigns.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
    }
  }
}

export default graphql(campaignsQuery)(ListCampaigns);