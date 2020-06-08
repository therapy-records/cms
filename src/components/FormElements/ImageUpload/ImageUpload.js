import React, { useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import imageUploadReducer, { initReducerState } from './reducer';
import {
  CLOUDINARY_UPLOAD,
  CLOUDINARY_DELETE
} from '../../../mutations';
import ImageUploadInput from './ImageUploadInput';
import ImageUploadList from './ImageUploadList';
import FormFieldError from '../FormFieldError';
import { objectHasValues } from '../../../utils/objects';
import {
  // getImageBase64String,
  getImageDimensions
} from '../../../utils/get-image-data';
import validateImageDimensions from '../../../utils/validate-image-dimensions';

const ImageUpload = ({
  cloudinaryKey,
  cloudinarySignature,
  cloudinaryTimestamp,
  existingImages,
  minImageDimensions,
  ctaCopy,
  multiple
}) => {
  const initImages = existingImages;

  const [ state, dispatch ] = useReducer(
    imageUploadReducer,
    initImages,
    initReducerState
  );

  const {
    images,
    validationMessage
  } = state;

  const [
    uploadImages,
    {
      loading,
      error
    }
  ] = useMutation(CLOUDINARY_UPLOAD);

  const [
    deleteImage,
    {
      error: deleteError
    }
  ] = useMutation(CLOUDINARY_DELETE);

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
          if (objectHasValues(minImageDimensions)) {
            getImageDimensions(image).then((imageData) => {
              const validateImage = validateImageDimensions(minImageDimensions, imageData);
              const { isValid, message } = validateImage;
              if (isValid) {
                onUploadImage(image.path, imageData.base64String);
              } else {
                dispatch({
                  type: 'addValidationMessage',
                  payload: message
                });
              }
            });
            // getImageDimensions(image).then((imageData) => {
            //   console.log(`${image.path} dimensions: ${imageData.width} and ${imageData.height}`);
            //   uploadImage(image.path, imageData.base64String);
            // });
          } else {
            // getImageBase64String(image).then((base64String) =>
            //   uploadImage(image.path, base64String)
            // );
          }
        }
      });
    }
  }, [ images.length ]);

  const onUploadImage = (localPath, imgStr) => {
    uploadImages({
      variables: {
        input: {
          image: imgStr
        }
      }
    }).then(result => {
      if (result.data && result.data.cloudinaryUpload) {
        const {
          publicId,
          url: uploadedUrl
        } = result.data.cloudinaryUpload;

        dispatch({
          type: 'addCloudinaryUrlToImage',
          payload: {
            uploadedUrl,
            publicId,
            originalPath: localPath
          }
        });
      }
    });
  };

  const onDeleteImage = (publicId) => {
    deleteImage({
      variables: {
        input: {
          publicId
        }
      }
    }).then(result => {
      const success = (result.data && result.data.cloudinaryDelete && result.data.cloudinaryDelete.success);
      if (success) {
        dispatch({
          type: 'deleteImage',
          payload: {
            cloudinaryPublicId: publicId
          }
        });
      }
    });
  };

  const hasError = (error || deleteError);
  const errorMessage = hasError && (error ? 'Image upload failed' : 'Delete image failed');

  return (
    <div className='image-upload'>

      <div className='flex-container'>

        <ImageUploadInput
          onDrop={onDrop}
          uploadImage={onUploadImage}
          images={images}
          loading={loading}
          ctaCopy={ctaCopy}
          minImageDimensions={minImageDimensions}
          multiple={multiple}
        />

        <ImageUploadList
          images={images}
          deleteImage={onDeleteImage}
        />

      </div>

      {hasError && (
        <FormFieldError
          error={errorMessage}
        />
      )}

      {validationMessage && (
        <FormFieldError
          error={validationMessage}
        />
      )}

    </div>
  )
}

ImageUpload.propTypes = {
  cloudinaryKey: PropTypes.string.isRequired,
  cloudinarySignature: PropTypes.string.isRequired,
  cloudinaryTimestamp: PropTypes.string.isRequired,
  existingImages: PropTypes.array,
  ctaCopy: PropTypes.string,
  minImageDimensions: PropTypes.object,
  multiple: PropTypes.bool
};

ImageUpload.defaultProps = {
  existingImages: [],
  ctaCopy: '',
  minImageDimensions: {},
  multiple: false
};

export default ImageUpload;
