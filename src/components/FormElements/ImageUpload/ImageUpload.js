import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import imageUploadReducer, { initReducerState } from './reducer';
import { CLOUDINARY_UPLOAD } from '../../../mutations';
import ImageUploadInput from './ImageUploadInput';

const ImageUpload = ({
  cloudinaryKey,
  cloudinarySignature,
  cloudinaryTimestamp,
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

  const onUploadImage = (localPath, imgStr) => {
    uploadImages({
      variables: {
        input: {
          image: imgStr
        }
      }
    }).then(result => {
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
    });
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}

      <ImageUploadInput
        onDrop={onDrop}
        uploadImage={onUploadImage}
        images={images}
        loading={loading}
      />

    </div>
  )
}

ImageUpload.propTypes = {
  cloudinaryKey: PropTypes.string.isRequired,
  cloudinarySignature: PropTypes.string.isRequired,
  cloudinaryTimestamp: PropTypes.string.isRequired,
  existingImages: PropTypes.array
};

ImageUpload.defaultProps = {
  existingImages: []
};

export default ImageUpload;
