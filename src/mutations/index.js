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
  mutation($input: CollaboratorInput) {
    editCollaborator(input: $input) {
      name,
      avatarUrl,
      collabOn,
      role,
      about
    }
  }
`;
