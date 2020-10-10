import React from 'react';
import PropTypes from 'prop-types';

const GalleryImageDetails = ({
  image,
  description
}) => (
  <div className='entity-container'>

    <div className='flex-root'>

      <div className='entity-image-container'>
        <img src={image.cloudinaryUrl} alt={description} />
      </div>

      <div>
        <h4>Description</h4>
        <p>{description}</p>
      </div>

    </div>
  </div>
);

GalleryImageDetails.propTypes = {
  image: PropTypes.shape({
    cloudinaryUrl: PropTypes.string.isRequired,
    cloudinaryPublicId: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string.isRequired
};

export default GalleryImageDetails;
