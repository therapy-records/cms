import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  name,
  placeholder,
  hideLabel,
  autoFocus,
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

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        value={value}
        onChange={e => handleOnChange(e.target.value)}
        rows="2"
      />

    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  value: ''
};

export default TextArea;
