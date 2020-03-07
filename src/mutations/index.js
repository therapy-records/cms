import { gql } from 'apollo-boost';

export const CREATE_COLLABORATOR = gql`
  mutation($input: CollaboratorInput) {
    createCollaborator(input: $input) {
      name,
      avatarUrl,
      collabOn,
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
      avatarUrl,
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
      releaseDate
    }
  }
`;

export const DELETE_PRESS_ARTICLE = gql`
  mutation($id: ID!) {
    deletePress(_id: $id) {
      _id
    }
  }
`;
