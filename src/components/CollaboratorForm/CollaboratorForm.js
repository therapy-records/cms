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
  isEdit
}) => (
    <Form
      mutation={mutation}
      fields={mapFieldsWithValues(COLLABORATOR_FIELDS, collabValues)}
      mutateId={id}
      refetchQueries={refetchQueries}
      baseUrl='/collaborators'
      successCopy={{
        success: isEdit ? 'Successfully updated!' : '',
        homeLink: 'Go to Collaborators'
      }}
      isEdit={isEdit}
    />
);

CollaboratorForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  collabValues: PropTypes.object.isRequired,
  id: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEdit: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  id: '',
  refetchQueries: [],
  isEdit: false
};

export default CollaboratorForm;
