import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

const GalleryForm = ({
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
    baseUrl='/gallery'
    submitButtonCopy={isEdit ? 'Update Gallery Image' : 'Upload'}
    successCopy={{
      success: isEdit ? 'Successfully updated!' : 'Successfully created!',
      homeLink: 'Go to Gallery',
      createLink: isEdit ? 'Create a Gallery Image' : 'Create another Gallery Image'
    }}
    isEdit={isEdit}
  />
);

GalleryForm.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEdit: PropTypes.bool
};

GalleryForm.defaultProps = {
  id: '',
  refetchQueries: [],
  isEdit: false
};

export default GalleryForm;
