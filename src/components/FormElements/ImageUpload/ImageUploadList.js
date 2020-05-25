import React from 'react';
import PropTypes from 'prop-types'

const ImageUploadList = ({ images, onRemove }) => {
  const hasImages = images && images.length > 0;

  if (hasImages) {
    return (
      <div>
        <ul className='flex-root uploaded-images-container'>

          {(images.length && images.length > 0) && images.map((image, index) => {
            if (image.cloudinaryUrl) {
              return (
                <li className='upload-image-list-item' key={image.cloudinaryUrl}>

                  <img src={image.cloudinaryUrl} />

                  <button
                    type='button'
                    className='btn-danger btn-sm-remove'
                    onClick={() => onRemove(image)}
                  >
                    remove
                  </button>

                </li>
              );
            }
            return null;
          })}

        </ul>
      </div>
    )
  }
  return null;
}

ImageUploadList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  // onRemove: PropTypes.func.isRequired
  onRemove: PropTypes.func
};

ImageUploadList.defaultProps = {
  images: [],
  onRemove: () => {}
};

export default ImageUploadList;
