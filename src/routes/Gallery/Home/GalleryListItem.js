import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GalleryListItem = ({ _id, image }) => {
  const { cloudinaryUrl } = image;

  return (
    <li style={{ border: 'solid 1px #000' }}>
      <Link
        to={`/gallery/${_id}`}
      >
        <img src={cloudinaryUrl} style={{ width: '100%' }} />
      </Link>
    </li>
  );
};

GalleryListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.shape({
    cloudinaryUrl: PropTypes.string.isRequired
  })
};

export default GalleryListItem;
