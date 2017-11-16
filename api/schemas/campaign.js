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
  
  # the schema allows the following queries
  type Query {
    campaigns: [Campaign],
    campaign(id: ID!): Campaign!
  }
`;

const resolvers = {
  Query: {
    campaign: (obj, { id }) => Campaign.query().findById(id),
    campaigns: () => Campaign.query()
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
