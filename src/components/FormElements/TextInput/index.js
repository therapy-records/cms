import React, { useState } from 'react';
import PropTypes from 'prop-types';

const textInput = ({
  label,
  name,
  placeholder,
  hideLabel,
  autoFocus,
  type,
  required,
  maxLength,
  error
}) => {

  const [value, setValue] = useState('');

  return (
    <div className='text-input-container'>

      {(label && !hideLabel) && <label htmlFor={name}>{label}{required && <span className='required'>*</span>}</label>}

      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        maxLength={maxLength}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      {error && <span className='form-error'>{label} is {error}</span>}
    </div>
  );
};

textInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  error: PropTypes.string
}

export default textInput;
