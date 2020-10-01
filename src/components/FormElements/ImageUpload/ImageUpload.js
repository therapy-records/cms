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
  getImageBase64String,
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
  multiple,
  handleOnUpload,
  handleOnRemove
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
    dispatch({ type: 'removeValidationMessage' });

    if (!multiple && files.length > 1) {
      dispatch({
        type: 'addValidationMessage',
        payload: 'Only 1 image allowed.'
      });
    } else {
      dispatch({
        type: 'addImages',
        payload: files
      });
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      images.forEach(image => {
        if (image && !image.cloudinaryUrl) {
          if (objectHasValues(minImageDimensions)) {
            getImageDimensions(image).then((imageData) => {
              const validateImage = validateImageDimensions(minImageDimensions, imageData);
              const { isValid, message } = validateImage;

              if (isValid) {
                onUploadImage(image.path, imageData.base64String);
              } else {
                dispatch({
                  type: 'deleteLocalImage',
                  payload: {
                    path: image.path
                  }
                });

                dispatch({
                  type: 'addValidationMessage',
                  payload: message
                });
              }
            });
          } else {
            getImageBase64String(image).then((base64String) =>
              onUploadImage(image.path, base64String)
            );
          }
        }
      });
      // }
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
          publicId: cloudinaryPublicId,
          url: uploadedUrl
        } = result.data.cloudinaryUpload;

        dispatch({
          type: 'addCloudinaryUrlToImage',
          payload: {
            uploadedUrl,
            cloudinaryPublicId,
            originalPath: localPath
          }
        });

        // TODO: Form component needs onChange event.
        // then Form reducer have 'valid' flag when uploading an image.

        // this is purely to support legacy, non-graphql based forms.
        if (handleOnUpload) {
          const uploadedImageInState = images.find((i) => i.cloudinaryUrl === uploadedUrl);
          const uploadedImageIndex = images.indexOf(uploadedImageInState);
          handleOnUpload(
            uploadedUrl,
            uploadedImageIndex,
            cloudinaryPublicId
          )
        }
      }
    });
  };

  const onDeleteImage = (publicId) => {
    // this is purely to support legacy, non-graphql based forms.
    const imageInState = images.find((i) => i.cloudinaryPublicId === publicId);
    const imageIndex = images.indexOf(imageInState);

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

        // this is purely to support legacy, non-graphql based forms.
        if (handleOnRemove) {
          handleOnRemove(imageIndex)
        }
      }
    });
  };

  const hasError = (error || deleteError);
  const errorMessage = hasError && (error ? 'Image upload failed' : 'Delete image failed');

  // console.log('images ', images);

  const imagesHiddenInputValue = [];

  if (images.length > 0) {
    images.map((i) => {
      if (i && i.cloudinaryPublicId && i.cloudinaryUrl) {
        imagesHiddenInputValue.push({
          cloudinaryPublicId: i.cloudinaryPublicId,
          cloudinaryUrl: i.cloudinaryUrl
        });
      }
    })
  }
  // console.log('imagesHiddenInputValue ', imagesHiddenInputValue);

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

      <input
        type='hidden'
        id='avatar'
        value={images}
      />

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
  multiple: PropTypes.bool,
  // handleOnUpload and handleOnRemove are purely to support legacy, non-graphql based forms.
  handleOnUpload: PropTypes.func,
  handleOnRemove: PropTypes.func
};

ImageUpload.defaultProps = {
  existingImages: [],
  ctaCopy: '',
  minImageDimensions: {},
  multiple: false,
  handleOnUpload: null,
  handleOnRemove: null
};

export default ImageUpload;
