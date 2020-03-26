import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  name,
  placeholder,
  hideLabel,
  autoFocus,
  type,
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
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  value: ''
};

export default TextInput;
