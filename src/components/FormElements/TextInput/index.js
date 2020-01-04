import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  name,
  placeholder,
  hideLabel,
  autoFocus,
  type,
  required,
  maxLength,
  value: initValue,
  onChange
}) => {

  const [value, setValue] = useState(initValue);

  const handleOnChange = value => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }

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
        onChange={e => handleOnChange(e.target.value)}
      />

    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  props: PropTypes.object,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  value: ''
};

export default TextInput;
