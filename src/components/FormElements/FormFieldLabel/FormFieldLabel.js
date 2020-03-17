import React from 'react';
import PropTypes from 'prop-types';

const FormFieldLabel = ({
  id,
  label,
  required,
  helpText
}) => (
  <label htmlFor={id}>
    {label}
    {required && (
      <span className='required'>*</span>
    )}
    {helpText && (
      <span className='help-text'><small>{helpText}</small></span>
    )}
  </label>
)

FormFieldLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helpText: PropTypes.string,
};

FormFieldLabel.defaultProps = {
  required: false,
  helpText: ''
};

export default FormFieldLabel;
