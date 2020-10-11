import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../FormElements/FormField';
import './GalleryImageUploadList.css';

const GalleryImageUploadList = ({
  images,
  onChangeDescription
}) => {
  const hasImages = images && images.length > 0;

  if (hasImages) {
    return (
      <ul className='gallery-image-upload-list'>
        {images.length && images.map((image, index) => (
          <li
            key={index}
            className='gallery-image-upload-list-item'
          >

            <img src={image.cloudinaryUrl} />

            <div className='gallery-image-upload-list-item-form-field-container'>
              <FormField
                id={`description-${index}`}
                component='TextInput'
                type='text'
                placeholder='test....'
                label='Description'
                name='temp...'
                required
                onChange={(value) => {
                  onChangeDescription(image.cloudinaryPublicId, value)
                }}
              />

              <FormField
                id={`collaboratorsInImage-${index}`}
                component='TextInput'
                type='text'
                placeholder='test....'
                label='Who is in this image?'
                name='temp...'
                required
              />
            </div>

            <button className='btn-danger'>Remove</button>
          </li>
        ))}
      </ul>
    )
  }
  return null;
};

GalleryImageUploadList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onChangeDescription: PropTypes.func.isRequired
};

GalleryImageUploadList.defaultProps = {
  images: []
};

export default GalleryImageUploadList;
