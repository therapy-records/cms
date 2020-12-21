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
  defaultOptions,
  onChange
}) => {
  const [ selectedOptions, setSelectedOptions ] = useState(defaultOptions);

  return (
    <Select
      defaultValue={selectedOptions}
      onChange={(value) => {
        onChange(value)
        setSelectedOptions(value)
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
  })).isRequired,
  defaultOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

SelectSearch.defaultProps = {
  defaultOptions: []
};

export default SelectSearch;
