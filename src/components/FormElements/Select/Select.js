import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name,
  placeholder,
  hideLabel,
  options,
  value: initValue,
  onChange
}) => {
  const handleOnChange = (ev) => {
    onChange(ev.target.value);
  }

  return (
    <select
      id={name}
      name={name}
      onChange={handleOnChange}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
        >{option.text}</option>
      ))}
    </select>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};

Select.defaultProps = {
  value: ''
};

export default Select;
