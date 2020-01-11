import React from 'react';
import PropTypes from 'prop-types';

const FormFieldLabel = ({
  id,
  label,
  required
}) => (
  <label htmlFor={id}>{label}{required && <span className='required'>*</span>}</label>
)

FormFieldLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

FormFieldLabel.defaultProps = {
  required: false
};

export default FormFieldLabel;
