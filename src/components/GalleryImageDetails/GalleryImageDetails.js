import React from 'react';
import PropTypes from 'prop-types';

const GalleryImageDetails = ({
  cloudinaryUrl,
  description
}) => (
  <div className='entity-container'>

    <div className='flex-root'>

      <div className='entity-image-container'>
        <img src={cloudinaryUrl} alt={description} />
      </div>

      <div>
        <h4>Description</h4>
        <p>{description}</p>
      </div>

    </div>
  </div>
);

GalleryImageDetails.propTypes = {
  cloudinaryUrl: PropTypes.string.isRequired,
  cloudinaryPublicId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default GalleryImageDetails;
