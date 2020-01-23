import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

const CollaboratorForm = ({
  mutation,
  fields,
  id,
  refetchQueries,
  isEdit
}) => (
    <Form
      mutation={mutation}
      fields={fields}
      mutateId={id}
      refetchQueries={refetchQueries}
      baseUrl='/collaborators'
      successCopy={{
        success: isEdit ? 'Successfully updated!' : 'Successfully created!',
        homeLink: 'Go to Collaborators',
        createLink: isEdit ? 'Create a Collaborator' : 'Create another Collaborator'
      }}
      isEdit={isEdit}
    />
);

CollaboratorForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
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
