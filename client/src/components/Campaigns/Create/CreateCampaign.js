import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { createCampaign, campaignsQuery } from '../queries';

const CreateMessage = class CreateMessage extends Component {

  state = {
    minPlayers: 1,
    maxPlayers: 10,
    skillLevel: 1,
    postingFrequency: 1
  };

  render() {
    if (this.state.saved) {
      return <Redirect to="/campaigns"/>;
    }

    return (
      <div className="Create">
        <h1>Create a New Campaign</h1>

        <form>
          <FormGroup>
            <ControlLabel>Campaign Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              placeholder="Enter Campaign Name"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              componentClass="textarea"
              value={this.state.scenario}
              placeholder="Enter Scenario"
              onChange={e => this.setState({ scenario: e.target.value })}
            />

            <FormControl
              componentClass="textarea"
              value={this.state.overview}
              placeholder="Enter Overview"
              onChange={e => this.setState({ overview: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Minimum Players</ControlLabel>
            <FormControl
              type="text"
              value={this.state.minPlayers}
              placeholder="Minimum Players"
              onChange={e => this.setState({ minPlayers: e.target.value })}
            />
            <ControlLabel>Max Players</ControlLabel>
            <FormControl
              type="text"
              value={this.state.maxPlayers}
              placeholder="Maximum Players"
              onChange={e => this.setState({ maxPlayers: e.target.value })}
            />
            <ControlLabel>Skill Level</ControlLabel>
            <FormControl
              type="text"
              value={this.state.skillLevel}
              placeholder="Minimum Level"
              onChange={e => this.setState({ skillLevel: e.target.value })}
            />
            <ControlLabel>Posting Frequence</ControlLabel>
            <FormControl
              type="text"
              value={this.state.postingFrequency}
              placeholder="Posting Frequence"
              onChange={e => this.setState({ postingFrequency: e.target.value })}
            />
          </FormGroup>
        </form>

        <Button bsStyle="primary" onClick={this.submit}>Submit</Button>
      </div>
    );
  }

  submit = () => {
    this.props
      .mutate({
        variables: {
          input: {
            title: this.state.title,
            scenario: this.state.scenario,
            overview: this.state.overview,
            gameSettings: {
              minPlayers: this.state.minPlayers,
              maxPlayers: this.state.maxPlayers,
              skillLevel: this.state.skillLevel,
              postingFrequency: this.state.postingFrequency,
            }
          }
        },
        update: (store, { data: { createCampaign } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: campaignsQuery });
          // Add our comment from the mutation to the end.
          data.campaigns.push(createCampaign);
          // Write our data back to the cache.
          store.writeQuery({ query: campaignsQuery, data });
        }
      })
      .then(() => this.setState({ saved: true }))
  }
};

export default graphql(createCampaign)(CreateMessage);