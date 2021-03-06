import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import CollaboratorDetails from '../../../components/CollaboratorDetails';
import './CollaboratorView.css';

const CollaboratorView = ({
  match
}) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/collaborators'
      entityName='collaborator'
      entityCollection='collaborators'
      id={id}
      render={entityData => (
        <CollaboratorDetails {...entityData} />
      )}
      query={GET_COLLABORATOR}
      mutation={DELETE_COLLABORATOR}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Collaborators'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_COLLABORATORS,
        responseObjName: 'deleteCollaborator'
      }}
    />
  );
};

CollaboratorView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollaboratorView;
