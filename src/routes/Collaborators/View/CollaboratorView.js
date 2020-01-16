import React from 'react';
import PropTypes from 'prop-types';
import { GET_COLLABORATOR } from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import Collaborator from './Collaborator';
import './CollaboratorView.css';

const CollaboratorViewNew = ({
  match
}) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/collaborators'
      entityName='collaborator'
      id={id}
      component={Collaborator}
      query={GET_COLLABORATOR}
      mutation={DELETE_COLLABORATOR}
      renderEditLink
    />
  );
}

CollaboratorViewNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollaboratorViewNew;
