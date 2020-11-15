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
  handleOnRemove,
  imageUploadListItemComponent,
  selectOptions
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
        payload: 'Only 1 image is allowed.'
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

        if (handleOnUpload) {
          const uploadedImageInState = images.find((i) => i && i.cloudinaryUrl === uploadedUrl);
          const uploadedImageIndex = images.indexOf(uploadedImageInState);

          handleOnUpload(
            {
              cloudinaryUrl: uploadedUrl,
              cloudinaryPublicId
            },
            uploadedImageIndex
          )
        }
      }
    });
  };

  const onDeleteImage = (publicId) => {
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

        if (handleOnRemove) {
          handleOnRemove(imageIndex)
        }
      }
    });
  };

  const onChangeDescription = (imagePublicId, description) => {
    if (description.length) {
      dispatch({
        type: 'changeImageDescription',
        payload: {
          cloudinaryPublicId: imagePublicId,
          description
        }
      });
    }
  }

  const onChangeCollaboratorsInImage = (imagePublicId, collaboratorsArray) => {
    const collaboratorsIdArray = collaboratorsArray.map((c) => c.value);

    dispatch({
      type: 'changeCollaboratorsInImage',
      payload: {
        cloudinaryPublicId: imagePublicId,
        collaboratorsArray: collaboratorsIdArray
      }
    });
  }

  const hasError = (error || deleteError);
  const errorMessage = hasError && (error ? 'Image upload failed' : 'Delete image failed');

  let imagesHiddenInputValue = [];

  if (images.length > 0) {
    imagesHiddenInputValue = images.map((image, index) => {
      const imageObj = {
        cloudinaryPublicId: image.cloudinaryPublicId,
        cloudinaryUrl: image.cloudinaryUrl,
        description: image.description,
        collaboratorsInImage: image.collaboratorsInImage
      };
      return imageObj;
    });
  }

  return (
    <div className={imageUploadListItemComponent ? 'image-upload image-upload-with-bespoke-list' : 'image-upload'}>

      <div className={imageUploadListItemComponent ? '' : 'flex-container'}>

        <ImageUploadInput
          onDrop={onDrop}
          uploadImage={onUploadImage}
          images={images}
          loading={loading}
          ctaCopy={ctaCopy}
          minImageDimensions={minImageDimensions}
          multiple={multiple}
        />

        {imageUploadListItemComponent ? (
          React.createElement(imageUploadListItemComponent, {
            images,
            onChangeDescription,
            onChangeCollaboratorsInImage,
            selectOptions
          })
        ) : (
          <ImageUploadList
            images={images}
            deleteImage={onDeleteImage}
          />
        )}

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

      {multiple ? (
        <input
          readOnly
          style={{ display: 'none' }}
          id='galleryImages'
          name='galleryImages'
          value={JSON.stringify(imagesHiddenInputValue)}
        />
      ) : (
        <div>
          <input
            readOnly
            style = {{ display: 'none' }}
            id='avatar.cloudinaryUrl'
            name='avatar.cloudinaryUrl'
            value={imagesHiddenInputValue.length && imagesHiddenInputValue[0].cloudinaryUrl}
          />

          <input
            readOnly
            style={{ display: 'none' }}
            id='avatar.cloudinaryPublicId'
            name='avatar.cloudinaryPublicId'
            value={imagesHiddenInputValue.length && imagesHiddenInputValue[0].cloudinaryPublicId}
          />
        </div>
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
  multiple: PropTypes.bool,
  handleOnUpload: PropTypes.func,
  handleOnRemove: PropTypes.func,
  imageUploadListItemComponent: PropTypes.func,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

ImageUpload.defaultProps = {
  existingImages: [],
  ctaCopy: '',
  minImageDimensions: {},
  multiple: false,
  handleOnUpload: null,
  handleOnRemove: null,
  imageUploadListItemComponent: null,
  selectOptions: []
};

export default ImageUpload;
