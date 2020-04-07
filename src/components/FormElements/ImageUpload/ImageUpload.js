import React, { useMemo, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';
import imageUploadReducer, { initReducerState } from './reducer';
import './styles.css';

// const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
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
  const { images } = state;

  const onDrop = useCallback(files => {
    dispatch({
      type: 'addImages',
      payload: files
    });
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => onDrop(files)
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
    <div className='image-upload-container'>

      {hasMinImageDimensions &&
        <span>Must be at least {minImageDimensions.width}px by {minImageDimensions.height}px</span>
      }

      <div {...getRootProps({
        style,
        multiple: true
      })}
      >
        <input {...getInputProps()} />
        {ctaCopy ? <span>{ctaCopy}</span> : <span>Drag &amp; drop images</span>}
      </div>

      <br />
      <br />

      {(images && images.length > 0) && (
        <div>
          <ul className='flex-root gallery-images-flex-root'>
            {images.map((i, index) => (
              <li style={{ clear: 'both', width: '100%' }} key={i + index}>{i}</li>
            ))}

            {/*
              images.map((i) => {
              if (i.length) {
                return (
                  <li key={i} className='col-50 no-list-style gallery-image-upload-item'>
                    <img src={i} alt={`image  ${i + 1}`} />
                    <button
                      type="button"
                      className="btn-danger btn-sm-remove"
                      remove
                    >
                    </button>
                  </li>
                )
              }
              return null;
            })
          */}
          </ul>
        </div>
      )}

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
