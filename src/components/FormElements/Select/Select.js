import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  input,
  name,
  placeholder,
  hideLabel,
  options,
  value: initValue,
  onChange,
  label,
  required
}) => {
  const handleOnChange = (ev) => {
    if (input && input.onChange) {
      input.onChange(ev.target.value);
    } else {
      onChange(ev.target.value);
    }
  }

  return (
    <div>
      {(label && !hideLabel) && <label>{label}{required && <span className='required'>*</span>}</label>}

      <select
        {...input}
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
    </div>
  );
};

Select.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  label: PropTypes.string,
  required: PropTypes.bool
};

Select.defaultProps = {
  value: '',
  hideLabel: true
};

export default Select;
