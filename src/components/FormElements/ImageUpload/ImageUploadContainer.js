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
  multiple,
  handleOnUpload,
  handleOnRemove,
  handleOnChange,
  imageUploadListItemComponent,
  selectOptions,
  defaultSelectOptions,
  dataType
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
      handleOnUpload={handleOnUpload}
      handleOnRemove={handleOnRemove}
      handleOnChange={handleOnChange}
      imageUploadListItemComponent={imageUploadListItemComponent}
      selectOptions={selectOptions}
      defaultSelectOptions={defaultSelectOptions}
      dataType={dataType}
    />
  )
};

ImageUploadContainer.propTypes = {
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object,
  ctaCopy: PropTypes.string,
  multiple: PropTypes.bool,
  handleOnUpload: PropTypes.func,
  handleOnRemove: PropTypes.func,
  handleOnChange: PropTypes.func,
  imageUploadListItemComponent: PropTypes.func,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  defaultSelectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  dataType: PropTypes.string
};

ImageUploadContainer.defaultProps = {
  minImageDimensions: {},
  ctaCopy: '',
  multiple: false,
  handleOnUpload: null,
  handleOnRemove: null,
  handleOnChange: null,
  imageUploadListItemComponent: null,
  selectOptions: [],
  defaultSelectOptions: [],
  dataType: ''
};

export default ImageUploadContainer;
