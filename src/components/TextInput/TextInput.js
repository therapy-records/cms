import React from 'react'
import PropTypes from 'prop-types'

const textInput = ({
  input,
  label,
  placeholder,
  hideLabel,
  autoFocus,
  type,
  required,
  maxLength,
  meta: {
    touched,
    error}
  }) => (
  <div className='text-input-container'>
    {(label && !hideLabel) && <label>{label}{required && <span className='required'>*</span>}</label>}
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
      maxLength={maxLength}
    />
    {touched && error && <span className='form-error'>{label} is {error}</span>}
  </div>
);

textInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  smallLabelSize: PropTypes.bool,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number
}

export default textInput;
