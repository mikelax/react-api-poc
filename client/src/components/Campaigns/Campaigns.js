import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ListCampaigns extends Component {

  render() {
    return (
      <div className="list-campaigns">
        <h1>Campaigns</h1>

        <div className="list">
          { this.content() }
        </div>
      </div>
    )
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

const CampaignsQuery = gql`
  query {
    campaigns{
      id
      title
    }
  }
`;

export default graphql(CampaignsQuery)(ListCampaigns);