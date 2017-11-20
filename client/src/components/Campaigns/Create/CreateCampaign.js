import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const CreateMessage = class CreateMessage extends Component {

  constructor(props) {
    super(props); //boo boilerplate

    this.state = {};
  }

  render() {
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
        </form>

        <Button bsStyle="primary" onClick={this.submit}>Submit</Button>
      </div>
    );
  }

  submit = () => {
    console.log('this', this)
    this.props
      .mutate()
      .then(() => console.log('arguments', arguments))
  }
};

const createCampaign = gql`
  mutation createCampaign {
    createCampaign(
      title: "second title"
    ) {
      id
    }
  }
`;

export default graphql(createCampaign)(CreateMessage);