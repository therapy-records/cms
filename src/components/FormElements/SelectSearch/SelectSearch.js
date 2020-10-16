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

const SelectSearch = ({ options }) => {
  const [ selectedOption, setSelectedOption ] = useState(null);

  return (
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      closeMenuOnSelect={false}
      isMulti
      name='collaboratorsInImage'
      styles={customStyles}
    // defaultValue={[ {} ]}
    />
  );
};

SelectSearch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

export default SelectSearch;
