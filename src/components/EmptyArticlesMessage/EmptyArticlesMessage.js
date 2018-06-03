import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EmptyArticlesMessage = ({type}) => (
  <div>
    <p>No articles yet. <Link to={`${type}/create`}>Create an article</Link></p>
  </div>
);

EmptyArticlesMessage.propTypes = {
  type: PropTypes.string.isRequired
};

export default EmptyArticlesMessage;
