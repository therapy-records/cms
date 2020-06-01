import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import {
  baseStyle,
  activeStyle,
  rejectStyle,
  loadingStyle
} from './DropzoneStyles.js';
import {
  getImageBase64String,
  getImageDimensions
} from '../../../utils/get-image-data';
import LoadingSpinner from '../../LoadingSpinner';
import './styles.css';
import { objectHasValues } from '../../../utils/objects';

const ImageUploadInput = ({
  onDrop,
  uploadImage,
  ctaCopy,
  minImageDimensions,
  multiple,
  images,
  loading
}) => {
  useEffect(() => {
    if (images.length > 0) {
      images.forEach(image => {
        if (!image.cloudinaryUrl) {
          if (objectHasValues(minImageDimensions)) {
            getImageDimensions(image).then((imageData) => {
              console.log(`${image.path} dimensions: ${imageData.width} and ${imageData.height}`);
              uploadImage(image.path, imageData.base64String);
            });
          } else {
            getImageBase64String(image).then((base64String) =>
              uploadImage(image.path, base64String)
            );
          }
        }
      });
    }
  }, [ images.length ]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
    ...(loading ? loadingStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <div {...getRootProps({
      style,
      multiple
    })}
    >
      <input {...getInputProps()} />

      {!loading && (
        <div>
          { ctaCopy ? <span>{ ctaCopy }</span> : <span>Drag &amp; drop images</span>}
        </div>
      )}

      {loading && <LoadingSpinner active />}

    </div>
  )
}

ImageUploadInput.propTypes = {
  onDrop: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ctaCopy: PropTypes.string,
  images: PropTypes.array.isRequired,
  minImageDimensions: PropTypes.object,
  multiple: PropTypes.bool
};

ImageUploadInput.defaultProps = {
  ctaCopy: '',
  minImageDimensions: {},
  multiple: false
};

export default ImageUploadInput;
