import React from 'react';
import PropTypes from 'prop-types';

const FormFieldError = ({ error }) => (
  <span className='form-error'>{error}</span>
);

FormFieldError.propTypes = {
  error: PropTypes.string.isRequired,
}

export default FormFieldError;
