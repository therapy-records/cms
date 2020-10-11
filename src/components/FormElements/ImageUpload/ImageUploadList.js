import React from 'react';
import PropTypes from 'prop-types'

const ImageUploadList = ({ images, deleteImage }) => {
  const hasImages = images && images.length > 0;

  if (hasImages) {
    return (
      <div>
        <ul className='flex-root uploaded-images-container'>

          {(images.length && images.length > 0) && images.map((image, index) => {
            if (!image) {
              return null;
            }

            if (image.cloudinaryUrl) {
              return (
                <li className='upload-image-list-item' key={`${index}-${image.cloudinaryPublicId}`}>

                  <img src={image.cloudinaryUrl} />

                  <button
                    type='button'
                    className='btn-danger btn-sm-remove'
                    onClick={() => deleteImage(image.cloudinaryPublicId)}
                  >
                    remove
                  </button>

                </li>
              );
            }
          })}

        </ul>
      </div>
    )
  }
  return null;
}

ImageUploadList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  deleteImage: PropTypes.func.isRequired
};

ImageUploadList.defaultProps = {
  images: []
};

export default ImageUploadList;
