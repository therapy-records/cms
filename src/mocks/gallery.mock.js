import {
  GET_GALLERY,
  GET_GALLERY_IMAGE
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
          },
          description: 'Test 1'
        },
        {
          _id: 'abc2',
          image: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234'
          },
          description: 'Test 2'
        }
      ]
    }
  }
};

export const MOCK_GET_GALLERY_IMAGE = {
  request: {
    query: GET_GALLERY_IMAGE,
    variables: { id: '1234' }
  },
  result: {
    data: {
      galleryImage: {
        _id: 'abc1',
        image: {
          cloudinaryUrl: 'test.com',
          cloudinaryPublicId: '1234'
        },
        description: 'Test 1'
      }
    }
  }
};
