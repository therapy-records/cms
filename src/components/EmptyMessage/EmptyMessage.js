import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmptyMessage = ({entityName, createCopy}) => (
  <div>
    <p>No {entityName} yet. <Link to={`${entityName}/create`}>{createCopy}</Link></p>
  </div>
);

EmptyMessage.propTypes = {
  entityName: PropTypes.string.isRequired,
  createCopy: PropTypes.string.isRequired
};

export default EmptyMessage;
