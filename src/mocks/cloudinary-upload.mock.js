import { CLOUDINARY_UPLOAD } from '../mutations';

export const MOCK_CLOUDINARY_UPLOAD = {
  request: {
    query: CLOUDINARY_UPLOAD,
    variables: {
      input: {
        image: 'local-image1.jpg'
      }
    }
  },
  result: {
    data: {
      cloudinaryUpload: {
        publicId: '1234',
        url: 'cloudinary.com/1.jpg'
      }
    }
  }
};

export const MOCK_CLOUDINARY_UPLOAD_LOADING = {
  request: {
    query: CLOUDINARY_UPLOAD,
    variables: {
      input: {
        image: 'local-image1.jpg'
      }
    }
  },
  result: {
    loading: true,
    data: {}
  }
};
