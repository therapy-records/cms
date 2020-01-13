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
