import {
  GET_GALLERY,
  GET_GALLERY_IMAGE,
  GET_GALLERY_IMAGE_WITH_COLLAB_NAMES
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
          cloudinaryUrl: 'test.com',
          cloudinaryPublicId: '1234',
          description: 'Test 1'
        },
        {
          _id: 'abc2',
          cloudinaryUrl: 'test.com',
          cloudinaryPublicId: '1234',
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
        cloudinaryUrl: 'test.com',
        cloudinaryPublicId: '1234',
        description: 'Test 1',
        collaboratorsInImage: []
      }
    }
  }
};

export const MOCK_GET_GALLERY_IMAGE_WITH_COLLAB_NAMES = {
  request: {
    query: GET_GALLERY_IMAGE_WITH_COLLAB_NAMES,
    variables: { id: '1234' }
  },
  result: {
    data: {
      galleryImageWithCollaboratorNames: {
        _id: 'abc1',
        cloudinaryUrl: 'test.com',
        cloudinaryPublicId: '1234',
        description: 'Test 1',
        collaboratorsInImage: [
          { _id: '1234', name: 'Joe Bloggs' },
          { _id: '5678', name: 'Ben Jones' }
        ]
      }
    }
  }
};
