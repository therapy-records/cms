import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

const PressForm = ({
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
      baseUrl='/press'
      submitButtonCopy={isEdit ? 'Update article' : 'Add Press article'}
      successCopy={{
        success: isEdit ? 'Successfully updated!' : 'Successfully created!',
        homeLink: 'Go to Press',
        createLink: isEdit ? 'Create a Press article' : 'Create another Press article'
      }}
      isEdit={isEdit}
    />
  );

PressForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEdit: PropTypes.bool
};

PressForm.defaultProps = {
  id: '',
  refetchQueries: [],
  isEdit: false
};

export default PressForm;
