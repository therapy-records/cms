import React from 'react';
import PropTypes from 'prop-types';
import QueryContainer from '../../../containers/QueryContainer';
import { EDIT_COLLABORATOR } from '../../../mutations';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import { mapFieldsWithValues } from '../../../utils/form';

const CollabEditNew = ({ match }) => {
  const { id } = match.params;

  return (
    <QueryContainer
      query={GET_COLLABORATOR}
      queryVariables={{ id }}
      entityName='collaborator'
      render={data => (

        <Form
          mutation={EDIT_COLLABORATOR}
          fields={mapFieldsWithValues(COLLABORATOR_FIELDS, data)}
          mutateId={id}
          refetchQueries={[
            { query: GET_COLLABORATORS }
          ]}
          baseUrl='/collaborators'
          successCopy={{
            homeLink: 'Go to Collaborators'
          }}
          isEditForm
        />

      )}
    >
    </QueryContainer>
  );
}

CollabEditNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default CollabEditNew;
