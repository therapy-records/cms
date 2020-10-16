import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../FormElements/FormField';
import './GalleryImageUploadList.css';

const GalleryImageUploadList = ({
  images,
  onChangeDescription,
  selectOptions
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
                id='collaboratorsInImage'
                component='SelectSearch'
                type='arrayOfSomething'
                required
                label='Who is in this image?'
                options={selectOptions}
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
  onChangeDescription: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

GalleryImageUploadList.defaultProps = {
  images: [],
  selectOptions: []
};

export default GalleryImageUploadList;
