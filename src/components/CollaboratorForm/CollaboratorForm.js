import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import COLLABORATOR_FIELDS from '../../formFields/collaborator';
import mapFieldsWithValues from '../../utils/form-field-mappings';

const CollaboratorForm = ({
  mutation,
  collabValues,
  id,
  refetchQueries,
  isEditForm
}) => (
    <Form
      mutation={mutation}
      fields={mapFieldsWithValues(COLLABORATOR_FIELDS, collabValues)}
      mutateId={id}
      refetchQueries={refetchQueries}
      baseUrl='/collaborators'
      successCopy={{
        homeLink: 'Go to Collaborators'
      }}
      isEditForm={isEditForm}
    />
);

CollaboratorForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  collabValues: PropTypes.object.isRequired,
  id: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  id: '',
  refetchQueries: [],
  isEditForm: false
};

export default CollaboratorForm;
