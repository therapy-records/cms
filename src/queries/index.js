import { gql } from 'apollo-boost';

export const GET_COLLABORATORS = gql`
  {
    collaborators {
      _id,
      name,
      avatarUrl
    }
  }
`;
