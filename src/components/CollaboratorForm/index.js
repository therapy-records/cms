import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

export const CollaboratorForm = ({
  mutation,
  fields,
  isEditForm
}) => (
  <Form
    mutation={mutation}
    fields={fields}
    isEditForm={isEditForm}
  />
);


CollaboratorForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  isEditForm: false
};

export default CollaboratorForm;

