import { gql } from 'apollo-boost';

export const GET_GIGS = gql`
  {
    gigs {
      _id,
      title,
      location,
      venue,
      date,
      ticketsUrl
    }
  }
`;

export const GET_GIG = gql`
  query($id: ID!) {
    gig(_id: $id) {
      _id,
      title,
      location,
      venue,
      date,
      ticketsUrl
    } 
  }
`;

export const GET_COLLABORATORS = gql`
  {
    collaborators {
      _id,
      name,
      avatar {
        cloudinaryUrl
      },
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
        avatar {
          cloudinaryUrl,
          cloudinaryPublicId
        },
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
      title,
      excerpt,
      releaseDate,
      image {
        cloudinaryUrl,
        cloudinaryPublicId
      }
    }
  }
`;

export const GET_PRESS_ARTICLE = gql`
  query($id: ID!) {
    pressArticle(_id: $id) {
      _id,
      author,
      title,
      excerpt,
      externalLink,
      releaseDate,
      image {
        cloudinaryUrl,
        cloudinaryPublicId
      },
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
    },
    press {
      author
    },
    gigs {
      venue
    }
  }
`;

export const CLOUDINARY_SIGNATURE = gql`
  {
    cloudinarySignature {
      key,
      signature,
      timestamp
    }
  }
`;
