import gql from 'graphql-tag';

export const campaignsQuery = gql`
  query {
    campaigns{
      id
      title
    }
  }
`;

export const createCampaign = gql`
  mutation createCampaign($input: CreateCampaignInput) {
    createCampaign(input: $input) {
      id
      title
    }
  }
`;