import { CLOUDINARY_DELETE } from '../mutations';

export const MOCK_CLOUDINARY_DELETE = {
  request: {
    query: CLOUDINARY_DELETE,
    variables: {
      input: {
        publicId: '3300'
      }
    }
  },
  result: {
    data: {
      cloudinaryDelete: {
        success: true
      }
    }
  }
};
