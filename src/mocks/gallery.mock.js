import {
  GET_GALLERY
} from '../queries';

export const MOCK_GET_GALLERY = {
  request: {
    query: GET_GALLERY
  },
  result: {
    data: {
      gallery: [
        {
          _id: 'abc1',
          image: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234'
          }
        },
        {
          _id: 'abc2',
          image: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234'
          }
        }
      ]
    }
  }
};

