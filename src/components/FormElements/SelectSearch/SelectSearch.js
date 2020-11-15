import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const customStyles = {
  multiValueLabel: (styles) => ({
    ...styles,
    fontSize: '1em'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    cursor: 'pointer'
  }),
  clearIndicator: (styles) => ({
    ...styles,
    cursor: 'pointer'
  })
};

const SelectSearch = ({
  options,
  onChange
}) => {
  const [ selectedOption, setSelectedOption ] = useState([]);

  return (
    <Select
      defaultValue={selectedOption}
      onChange={(value) => {
        onChange(value)
        setSelectedOption(value)
      }}
      options={options}
      closeMenuOnSelect={false}
      isMulti
      name='collaboratorsInImage'
      styles={customStyles}
    />
  );
};

SelectSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

export default SelectSearch;
