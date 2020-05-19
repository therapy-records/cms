import React, { useMemo, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';
// import request from 'superagent';
import imageUploadReducer, { initReducerState } from './reducer';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './DropzoneStyles.js';
import ImageUploadList from './ImageUploadList';
import './styles.css';

// TODO: via api
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

const getImageDimensions = image => {
  return new Promise(resolve => {
    const reader = new FileReader();

    // read the contents of Image File.
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      // initiate the JavaScript Image object.
      var img = new Image();

      // st the Base64 string return from FileReader as image source
      img.src = e.target.result;

      // return the File width and height
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        return resolve({
          width,
          height,
          base64String: e.target.result
        });
      };
    };
  });
};

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
            });

            /*
            const upload = request.post(CLOUDINARY_UPLOAD_URL)
              .field('file', image)
              .field('api_key', cloudinaryKey)
              .field('signature', cloudinarySignature)
              .field('timestamp', cloudinaryTimestamp)

            upload.end((uploadErr, cloudinaryRes) => {
              if (cloudinaryRes && cloudinaryRes.ok && cloudinaryRes.body) {
                const {
                  secure_url: uploadedUrl,
                  public_id: publicId
                } = cloudinaryRes.body;

                dispatch({
                  type: 'addCloudinaryUrlToImage',
                  payload: {
                    uploadedUrl,
                    publicId,
                    originalPath: image.path
                  }
                });
              }
            });
            */
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
