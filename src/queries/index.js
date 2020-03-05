import { gql } from 'apollo-boost';

export const GET_COLLABORATORS = gql`
  {
    collaborators {
      _id,
      name,
      avatarUrl,
      orderNumber
    }
  }
`;

export const GET_COLLABORATOR = gql`
  query($id: ID!) {
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
          bandcamp,
          bio,
          email,
          phone
        }
      }
  }
`;

export const GET_PRESS = gql`
  {
    press {
      _id,
      author,
      copy
    }
  }
`;

export const GET_PRESS_ARTICLE = gql`
  query($id: ID!) {
    pressArticle(_id: $id) {
      _id,
      author,
      copy,
      externalLink,
      createdAt
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
