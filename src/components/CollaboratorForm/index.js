import React from 'react';
import PropTypes from 'prop-types';
import COLLABORATOR_FIELDS from './fields';
import Form from '../Form';

export const CollaboratorForm = ({
  mutation,
  isEditForm
}) => (
  <Form
    mutation={mutation}
    fields={COLLABORATOR_FIELDS}
    isEditForm={isEditForm}
  />
);


CollaboratorForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  isEditForm: false
};

export default CollaboratorForm;

