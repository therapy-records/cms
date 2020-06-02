import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { CLOUDINARY_SIGNATURE } from '../../../queries';
import ImageUpload from './ImageUpload';
import LoadingSpinner from '../../LoadingSpinner';
import StickyError from '../../StickyError';

const ImageUploadContainer = ({
  existingImages,
  minImageDimensions,
  ctaCopy,
  multiple
}) => {
  const {
    loading,
    error,
    data
  } = useQuery(CLOUDINARY_SIGNATURE);

  if (loading) {
    return (
      <LoadingSpinner
        active
      />
    )
  }

  if (error || !data) {
    return (
      <StickyError
        message='Sorry, something has gone wrong.'
        error={error}
      />
    )
  }

  const { signature, key, timestamp } = data.cloudinarySignature;

  return (
    <ImageUpload
      cloudinarySignature={signature}
      cloudinaryKey={key}
      cloudinaryTimestamp={timestamp}
      existingImages={existingImages}
      minImageDimensions={minImageDimensions}
      ctaCopy={ctaCopy}
      multiple={multiple}
    />
  )
};

ImageUploadContainer.propTypes = {
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object,
  ctaCopy: PropTypes.string,
  multiple: PropTypes.bool
};

ImageUploadContainer.defaultProps = {
  minImageDimensions: {},
  ctaCopy: '',
  multiple: false
};

export default ImageUploadContainer;
