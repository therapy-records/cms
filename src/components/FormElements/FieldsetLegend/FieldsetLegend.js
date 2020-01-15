import React from 'react';
import PropTypes from 'prop-types';

const FieldsetLegend = ({
  id,
  legend,
  required
}) => (
    <legend>{legend} {required && <span className='required'>*</span>}</legend>
  )

FieldsetLegend.propTypes = {
  id: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  required: PropTypes.bool
};

FieldsetLegend.defaultProps = {
  required: false
};

export default FieldsetLegend;
