import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmptyMessage = ({type}) => (
  <div>
    <p>No {type} yet. <Link to={`${type}/create`}>Create new {type.substring(0, type.length - 1)}</Link></p>
  </div>
);

EmptyMessage.propTypes = {
  type: PropTypes.string.isRequired
};

export default EmptyMessage;
