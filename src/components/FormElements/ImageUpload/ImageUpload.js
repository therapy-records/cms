import React, { useMemo, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';
import imageUploadReducer, { initReducerState } from './reducer';
import {
  baseStyle,
  activeStyle,
  rejectStyle,
  loadingStyle
} from './DropzoneStyles.js';
import ImageUploadList from './ImageUploadList';
import { CLOUDINARY_UPLOAD } from '../../../mutations';
import getImageDimensions from '../../../utils/get-image-dimensions';
import LoadingSpinner from '../../LoadingSpinner';
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

  const [
    uploadImages,
    {
      loading,
      error
    }
  ] = useMutation(CLOUDINARY_UPLOAD);

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
            console.log(`${image.path} dimensions: ${imageData.width} and ${imageData.height}`);

            uploadImages({
              variables: {
                input: {
                  image: imageDataResult.base64String
                }
              }
            }).then((result) => {
              // TODO: handle errors
              const {
                publicId,
                url: uploadedUrl
              } = result.data.cloudinaryUpload;

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
    isDragReject,
    loading
  ]);

  const hasMinImageDimensions = (minImageDimensions && minImageDimensions.width && minImageDimensions.height);

  return (
    <div className='image-upload'>

      {error && <p>Error :(</p>}

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
