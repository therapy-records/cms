import React, { useMemo, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';
import imageUploadReducer, { initReducerState } from './reducer';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './DropzoneStyles.js';
import ImageUploadList from './ImageUploadList';
import getImageDimensions from '../../../utils/get-image-dimensions';
import './styles.css';

const ImageUpload = ({
  cloudinaryKey,
  cloudinarySignature,
  cloudinaryTimestamp,
  ctaCopy,
  minImageDimensions,
  multiple,
  existingImages
}) => {
  const initImages = existingImages;

  const [ state, dispatch ] = useReducer(
    imageUploadReducer,
    initImages,
    initReducerState
  );

  const { images } = state;

  const onDrop = useCallback(files => {
    dispatch({
      type: 'addImages',
      payload: files
    });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      images.forEach(image => {
        if (!image.cloudinaryUrl) {
          let imageData = {};
          getImageDimensions(image).then((imageDataResult) => {
            imageData = imageDataResult;
            console.log(`${image.path} is... ${imageData.width} and ${imageData.height}`);

            fetch('http://localhost:4040/api/cloudinary-upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                image: imageDataResult.base64String
              })
            }).then((response) => {
              return response.json();
            }).then((data) => {
              const {
                url: uploadedUrl,
                public_id: publicId
              } = data.data;

              dispatch({
                type: 'addCloudinaryUrlToImage',
                payload: {
                  uploadedUrl,
                  publicId,
                  originalPath: image.path
                }
              });
            });
          });
        }
      });
    }
  }, [ images.length ]);

  const onRemove = (image) => {
    fetch('http://localhost:4040/api/cloudinary-destroy', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        publicId: image.cloudinaryPublicId
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      dispatch({
        type: 'removeImage',
        payload: {
          cloudinaryUrl: image.cloudinaryUrl
        }
      });
    });
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
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
          {ctaCopy ? <span>{ctaCopy}</span> : <span>Drag &amp; drop images</span>}
        </div>

        <ImageUploadList images={images} onRemove={onRemove} />

      </div>

    </div>
  )
}

ImageUpload.propTypes = {
  cloudinaryKey: PropTypes.string.isRequired,
  cloudinarySignature: PropTypes.string.isRequired,
  cloudinaryTimestamp: PropTypes.string.isRequired,
  ctaCopy: PropTypes.string,
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object,
  multiple: PropTypes.bool
};

ImageUpload.defaultProps = {
  ctaCopy: '',
  existingImages: [],
  minImageDimensions: {},
  multiple: false
};

export default ImageUpload;
