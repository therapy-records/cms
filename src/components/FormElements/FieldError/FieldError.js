import React from 'react';
import PropTypes from 'prop-types';

const FieldError = ({ error }) => (
  <span className='form-error'>{error}</span>
);

FieldError.propTypes = {
  error: PropTypes.string.isRequired,
}

export default FieldError;
