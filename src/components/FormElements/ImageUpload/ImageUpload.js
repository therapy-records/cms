import React, { useMemo, useCallback, useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';
import request from 'superagent';
import imageUploadReducer, { initReducerState } from './reducer';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle
} from './DropzoneStyles.js';
import './styles.css';

// TODO: via api
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

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
  ctaCopy,
  minImageDimensions
}) => {
  const [ state, dispatch ] = useReducer(
    imageUploadReducer,
    [],
    initReducerState
  );
  const [ cloudinarySignature, setCloudinarySignature ] = useState('');
  const [ cloudinaryTimestamp, setCloudinaryTimestamp ] = useState('');
  const [ cloudinaryKey, setCloudinaryApiKey ] = useState('');

  const { images } = state;

  const onDrop = useCallback(files => {
    dispatch({
      type: 'addImages',
      payload: files
    });
  }, []);

  useEffect(() => {
    if (!cloudinarySignature) {
      fetch('http://localhost:4040/api/cloudinary-signature').then((response) => {
        return response.json();
      }).then((data) => {
        const {
          key,
          signature,
          timestamp
        } = data;
        setCloudinarySignature(signature);
        setCloudinaryApiKey(key);
        setCloudinaryTimestamp(timestamp);
      });
    }
  }, [ cloudinarySignature ]);

  useEffect(() => {
    if (images.length > 0) {
      images.forEach(image => {
        if (!image.cloudinaryUrl) {
          let imageData = {};
          getImageDimensions(image).then((imageDataResult) => {
            imageData = imageDataResult;
            console.log(`${image.path} is... ${imageData.width} and ${imageData.height}`);

            // this breaks when return_delete_token is included
            const upload = request.post(CLOUDINARY_UPLOAD_URL)
              .field('file', image)
              .field('api_key', cloudinaryKey)
              .field('timestamp', cloudinaryTimestamp)
              .field('signature', cloudinarySignature)
              // .field('return_delete_token', true);

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
          });
        }
      });
    }
  }, [ images.length ]);

  const onDelete = (image) => {
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
          multiple: true
        })}
        >
          <input {...getInputProps()} />
          {ctaCopy ? <span>{ctaCopy}</span> : <span>Drag &amp; drop images</span>}
        </div>

        {(images && images.length > 0) && (
          <div>
            <ul className='flex-root gallery-images-flex-root'>

              {(images.length && images.length > 0) && images.map((image, index) => (
                <li className='image-upload-item' key={image.path}>
                  <img src={image.cloudinaryUrl} />
                  <button onClick={() => onDelete(image)}>delete</button>
                </li>
              ))}

            </ul>
          </div>
        )}

      </div>

    </div>
  )
}

ImageUpload.propTypes = {
  ctaCopy: PropTypes.string,
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object
};

ImageUpload.defaultProps = {
  ctaCopy: '',
  existingImages: [],
  minImageDimensions: {}
};

export default ImageUpload;
