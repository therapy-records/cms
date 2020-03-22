import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

const GigForm = ({
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
      baseUrl='/gigs'
      submitButtonCopy={isEdit ? 'Update a Gig' : 'Add Gig'}
      successCopy={{
        success: isEdit ? 'Successfully updated!' : 'Successfully created!',
        homeLink: 'Go to Gigs',
        createLink: isEdit ? 'Create a Gig' : 'Create another Gig'
      }}
      isEdit={isEdit}
    />
  );

GigForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEdit: PropTypes.bool
};

GigForm.defaultProps = {
  id: '',
  refetchQueries: [],
  isEdit: false
};

export default GigForm;
