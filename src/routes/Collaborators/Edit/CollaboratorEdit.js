import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import {
  EDIT_COLLABORATOR,
  DELETE_COLLABORATOR
} from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import CollaboratorForm from '../../../components/CollaboratorForm';

const CollaboratorEdit = ({ match }) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/collaborators'
      entityName='collaborator'
      id={id}
      render={entityData => (
        <CollaboratorForm
          mutation={EDIT_COLLABORATOR}
          collabValues={entityData}
          id={id}
          refetchQueries={[
            { query: GET_COLLABORATORS }
          ]}
          isEditForm
        />
      )}
      query={GET_COLLABORATOR}
      mutation={DELETE_COLLABORATOR}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Collaborators'
      }}
      renderEditLink
    />
  );
};

CollaboratorEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollaboratorEdit;
