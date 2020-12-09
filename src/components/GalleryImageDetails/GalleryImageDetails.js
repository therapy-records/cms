import React from 'react';
import PropTypes from 'prop-types';

const GalleryImageDetails = ({
  cloudinaryUrl,
  description,
  collaboratorsInImage
}) => {
  return (
    <div className='entity-container'>

      <div className='flex-root'>

        <div className='entity-image-container'>
          <img src={cloudinaryUrl} alt={description} />
        </div>

        <div>
          <h4>Description</h4>
          <p>{description}</p>
        </div>

        {collaboratorsInImage.length ? (
          <div>
            <h4>Collaborators in image</h4>
            <ul>
              {collaboratorsInImage.map((c) => (
                <li key={c._id}>{c.name}</li>
              ))}
            </ul>
          </div>
        ) : null }

      </div>
    </div>
  )
};

GalleryImageDetails.propTypes = {
  cloudinaryUrl: PropTypes.string.isRequired,
  cloudinaryPublicId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collaboratorsInImage: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
};

export default GalleryImageDetails;
