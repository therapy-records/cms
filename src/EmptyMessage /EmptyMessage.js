import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmptyMessage = ({entityName}) => (
  <div>
    <p>No {entityName} yet. <Link to={`${entityName}/create`}>{createCopy}</Link></p>
  </div>
);

EmptyMessage.propTypes = {
  type: PropTypes.string.isRequired
};

export default EmptyMessage;
