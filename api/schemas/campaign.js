import { makeExecutableSchema } from 'graphql-tools';

import Campaign from 'models/campaign';
import schemaScopeGate from 'services/schemaScopeGate';

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
    createCampaign(input: CreateCampaignInput): Campaign
  }
  
  input CreateCampaignInput {
    title: String!,
    scenario: String!,
    overview: String!,
    gameSettings: GameSettingInput!
  }
  
  input GameSettingInput {
    minPlayers: Int!,
    maxPlayers: Int!,
    skillLevel: Int!,
    postingFrequency: Int!
  }
`;

const resolvers = {
  Query: {
    campaign: (obj, { id }, context) =>
      schemaScopeGate(['read:messages'], context, () =>
        Campaign.query().findById(id)),

    campaigns: (obj, params, context) =>
      schemaScopeGate(['read:messages'], context, () =>
        Campaign.query())
  },
  Mutation: {
    createCampaign: (obj, { input }, context) =>
      schemaScopeGate(['write:messages'], context, () =>
        Campaign
          .query()
          .insert(input)
          .returning('*'))
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
