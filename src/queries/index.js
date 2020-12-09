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

export const GET_COLLABORATORS_NAMES = gql`
  {
    collaborators {
      _id,
      name
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
      releaseDate
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
      releaseDate
    }
  }
`;

export const GET_GALLERY = gql`
  {
    gallery {
      _id,
      cloudinaryUrl,
      cloudinaryPublicId,
      description
    }
  }
`;

export const GET_GALLERY_IMAGE = gql`
  query($id: ID!) {
    galleryImage(_id: $id) {
      _id,
      cloudinaryUrl,
      cloudinaryPublicId,
      description,
      collaboratorsInImage
    }
  }
`;

export const GET_GALLERY_IMAGE_WITH_COLLAB_NAMES = gql`
  query($id: ID!) {
    galleryImageWithCollaboratorNames(_id: $id) {
      _id,
      cloudinaryUrl,
      cloudinaryPublicId,
      description,
      collaboratorsInImage {
        _id,
        name
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
    },
    press {
      author
    },
    gigs {
      venue
    },
    gallery {
      description
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
