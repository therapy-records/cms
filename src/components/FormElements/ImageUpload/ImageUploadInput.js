// import React, { useMemo, useEffect } from 'react';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import {
  baseStyle,
  activeStyle,
  rejectStyle,
  loadingStyle
} from './DropzoneStyles';
import LoadingSpinner from '../../LoadingSpinner';
import './styles.css';

const ImageUploadInput = ({
  onDrop,
  ctaCopy,
  minImageDimensions,
  multiple,
  images,
  loading
}) => {
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
