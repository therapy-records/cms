import React from 'react'
import PropTypes from 'prop-types'

const textInput = ({ input, label, type, placeholder, smallLabelSize, props, meta: { touched, error } }) => (
  <div>
    <label className={smallLabelSize && 'label-small'}>{label}</label>
    <input {...input} placeholder={placeholder} type={type} {...props} />
    {touched && error && <span className='form-error'>{label} is {error}</span>}
  </div>
);

textInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  smallLabelSize: PropTypes.bool,
  meta: PropTypes.object.isRequired
}

export default textInput;
