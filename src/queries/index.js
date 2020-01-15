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

export const GET_COLLABORATOR = gql`
  query ($id: ID!){
      collaborator(_id: $id) {
        _id,
        name,
        role,
        about,
        avatarUrl,
        collabOn,
        urls {
          website,
          facebook,
          instagram,
          twitter,
          soundcloud,
          bio,
          email,
          phone,
          other {
            url,
            title
          }
        }
      }
  }
`;

export const GET_STATS = gql`
  {
    news {
      title
    },
    journalism {
      title
    },
    collaborators {
      name
    }
  }
`;
