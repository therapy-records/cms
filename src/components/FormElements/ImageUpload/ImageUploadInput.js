import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import {
  baseStyle,
  activeStyle,
  rejectStyle,
  loadingStyle
} from './DropzoneStyles.js';
import ImageUploadList from './ImageUploadList';
import getImageDimensions from '../../../utils/get-image-dimensions';
import LoadingSpinner from '../../LoadingSpinner';
import './styles.css';

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
          let imageData = {};
          getImageDimensions(image).then((imageDataResult) => {
            imageData = imageDataResult;
            console.log(`${image.path} dimensions: ${imageData.width} and ${imageData.height}`);
            uploadImage(image.path, imageDataResult.base64String);
          });
        }
      });
    }
  }, [ images.length ]);

  // const onRemove = (image) => {
  //   fetch('http://localhost:4040/api/cloudinary-destroy', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       publicId: image.cloudinaryPublicId
  //     })
  //   }).then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     dispatch({
  //       type: 'removeImage',
  //       payload: {
  //         cloudinaryUrl: image.cloudinaryUrl
  //       }
  //     });
  //   });
  // }

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
    // loading
  ]);

  const hasMinImageDimensions = (minImageDimensions && minImageDimensions.width && minImageDimensions.height);

  return (
    <div className='image-upload'>

      {hasMinImageDimensions &&
        <span>Must be at least {minImageDimensions.width}px by {minImageDimensions.height}px</span>
      }

      <div className='flex-container'>

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

        {/* <ImageUploadList images={images} onRemove={onRemove} /> */}
        <ImageUploadList images={images} />

      </div>

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
