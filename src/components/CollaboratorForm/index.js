import React from 'react';
import PropTypes from 'prop-types';
import { CREATE_COLLABORATOR } from '../../mutations';
import COLLABORATOR_FIELDS from './fields';
import Form from '../Form';

export const CollaboratorForm = ({ isEditForm }) => (
  <Form
    mutation={CREATE_COLLABORATOR}
    fields={COLLABORATOR_FIELDS}
    isEditForm={isEditForm}
  />
);


CollaboratorForm.propTypes = {
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  isEditForm: false
};

export default CollaboratorForm;

