import React, { useReducer, useCallback } from 'react';
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

const ImageUpload = ({
  cloudinaryKey,
  cloudinarySignature,
  cloudinaryTimestamp,
  existingImages,
  minImageDimensions
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

  const hasMinImageDimensions = (minImageDimensions && minImageDimensions.width && minImageDimensions.height);

  const hasError = (error || deleteError);
  const errorMessage = hasError && (error ? 'Image upload failed' : 'Delete image failed');

  return (
    <div className='image-upload'>

      {hasMinImageDimensions &&
        <span>Must be at least {minImageDimensions.width}px by {minImageDimensions.height}px</span>
      }

      <div className='flex-container'>

        <ImageUploadInput
          onDrop={onDrop}
          uploadImage={onUploadImage}
          images={images}
          loading={loading}
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

    </div>
  )
}

ImageUpload.propTypes = {
  cloudinaryKey: PropTypes.string.isRequired,
  cloudinarySignature: PropTypes.string.isRequired,
  cloudinaryTimestamp: PropTypes.string.isRequired,
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object
};

ImageUpload.defaultProps = {
  existingImages: [],
  minImageDimensions: {}
};

export default ImageUpload;
