import React from 'react';
import { Link } from 'react-router-dom';

const EmptyArticlesMessage = (type) => (
  <div>
    <p>No articles yet. <Link to={`${type}/create`}>Create an article</Link></p>
  </div>
);

export default EmptyArticlesMessage;
