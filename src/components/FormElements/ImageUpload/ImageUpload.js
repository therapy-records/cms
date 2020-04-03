import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone';

const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

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
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log('onDrop: ', acceptedFiles);
  }, [])

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

  return (
    <div className='image-upload-container'>

      {minImageDimensions &&
        <span>Must be at least {minImageDimensions.width}px by {minImageDimensions.height}px</span>
      }

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {ctaCopy ? <span>{ctaCopy}</span> : <span>Drag &amp; drop images</span>}
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
