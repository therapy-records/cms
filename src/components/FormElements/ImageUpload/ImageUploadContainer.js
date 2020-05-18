import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CLOUDINARY_SIGNATURE } from '../../../queries';
import ImageUpload from './ImageUpload';
import LoadingSpinner from '../../LoadingSpinner';
import StickyError from '../../StickyError';

const ImageUploadContainer = () => {
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
    />
  )
};

export default ImageUploadContainer;
