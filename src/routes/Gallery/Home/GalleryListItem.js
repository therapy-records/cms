import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GalleryListItem = ({
  _id,
  cloudinaryUrl,
  description
}) => (
  <li style={{ border: 'solid 1px #000' }}>
    <Link
      to={`/gallery/${_id}`}
    >
      <img
        src={cloudinaryUrl}
        style={{ width: '100%' }}
        alt={description}
      />
    </Link>
  </li>
);

GalleryListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  cloudinaryUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default GalleryListItem;
