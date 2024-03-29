import { gql } from 'apollo-boost';

export const CREATE_COLLABORATOR = gql`
  mutation($input: CollaboratorInput) {
    createCollaborator(input: $input) {
      name,
      avatar {
        cloudinaryUrl,
        cloudinaryPublicId
      },
      collabOn:,
      role,
      about
    }
  }
`;

export const EDIT_COLLABORATOR = gql`
  mutation($id: ID!, $input: CollaboratorInput) {
    editCollaborator(_id: $id, input: $input) {
      _id,
      name,
      avatar {
        cloudinaryUrl,
        cloudinaryPublicId
      },
      collabOn,
      role,
      about
    }
  }
`;

export const DELETE_COLLABORATOR = gql`
  mutation($id: ID!) {
    deleteCollaborator(_id: $id) {
      _id
    }
  }
`;

export const EDIT_COLLABORATORS_ORDER_NUMBERS = gql`
  mutation($input: CollaboratorOrderNumbersInput) {
    editCollaboratorOrderNumbers(input: $input){
      orderNumber,
      _id
    }
  }
`;

export const CREATE_PRESS = gql`
  mutation($input: PressInput) {
    createPress(input: $input) {
      author,
      title,
      excerpt,
      externalLink,
      releaseDate,
      image {
        cloudinaryUrl,
        cloudinaryPublicId
      }
    }
  }
`;

export const EDIT_PRESS = gql`
  mutation($id: ID!, $input: PressInput) {
    editPress(_id: $id, input: $input) {
      _id,
      author,
      title,
      excerpt,
      externalLink,
      releaseDate,
      categoryId,
      image {
        cloudinaryUrl,
        cloudinaryPublicId
      }
    }
  }
`;

export const DELETE_PRESS = gql`
mutation($id: ID!) {
  deletePress(_id: $id) {
    _id
  }
}
`;

export const CREATE_GIG = gql`
  mutation($input: GigInput) {
    createGig(input: $input) {
      title,
      location,
      date,
      venue,
      ticketsUrl
    }
  }
  `;

export const EDIT_GIG = gql`
  mutation($id: ID!, $input: GigInput) {
    editGig(_id: $id, input: $input) {
      _id,
      title,
      location,
      date,
      venue,
      ticketsUrl
    }
  }
`;

export const DELETE_GIG = gql`
  mutation($id: ID!) {
    deleteGig(_id: $id) {
      _id
    }
  }
`;

export const CLOUDINARY_UPLOAD = gql`
  mutation($input: CloudinaryUploadInput) {
    cloudinaryUpload(input: $input) {
      publicId,
      url
    }
  }
`;

export const CLOUDINARY_DELETE = gql`
  mutation($input: CloudinaryDeleteInput) {
    cloudinaryDelete(input: $input) {
      success
    }
  }
`;
