import { CLOUDINARY_SIGNATURE } from '../queries';

export const MOCK_CLOUDINARY_SIGNATURE = {
  request: {
    query: CLOUDINARY_SIGNATURE
  },
  result: {
    data: {
      cloudinarySignature: {
        key: '1234',
        signature: '5678',
        timestamp: '12345678910'
      }
    }
  }
};
