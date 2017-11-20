import { makeExecutableSchema } from 'graphql-tools';

import Campaign from 'models/campaign';

const typeDefs = `
  type GameSetting {
    minPlayers: Int!,
    maxPlayers: Int!,
    skillLevel: Int!,
    postingFrequency: Int!
  }
  
  type Campaign {
    id: ID!,
    title: String!,
    scenario: String!,
    overview: String!,
    gameSettings: GameSetting!
  }
  
  # queries
  type Query {
    campaigns: [Campaign],
    campaign(id: ID!): Campaign!
  }
  
  # mutations
  type Mutation {
    createCampaign(
      title: String!,
      scenario: String!,
      overview: String!
    ): Campaign
  }
`;

const resolvers = {
  Query: {
    campaign: (obj, { id }) => Campaign.query().findById(id),
    campaigns: () => Campaign.query()
  },
  Mutation: {
    createCampaign: (obj, body) => {
      console.log('obj', obj)
      console.log('body', body)
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
