import {
  GET_COLLABORATORS,
  GET_COLLABORATORS_NAMES,
  GET_COLLABORATOR
} from '../queries';
import { DELETE_COLLABORATOR } from '../mutations';

export const MOCK_GET_COLLABORATORS = {
  request: {
    query: GET_COLLABORATORS
  },
  result: {
    data: {
      collaborators: [
        { _id: 'abc1', name: 'test', avatar: { cloudinaryUrl: 'test.com' }, orderNumber: 1 },
        { _id: 'abc2', name: 'testing', avatar: { cloudinaryUrl: 'test.com' }, orderNumber: 2 }
      ]
    }
  }
};

export const MOCK_GET_COLLABORATORS_NAMES = {
  request: {
    query: GET_COLLABORATORS_NAMES
  },
  result: {
    data: {
      collaborators: [
        { _id: 'abc1', name: 'test' },
        { _id: 'abc2', name: 'testing' }
      ]
    }
  }
};

export const MOCK_GET_COLLABORATOR = {
  request: {
    query: GET_COLLABORATOR,
    variables: { id: '1234' }
  },
  result: {
    data: {
      collaborator: {
        _id: '1234',
        name: 'test',
        role: 'testing',
        about: '<p>test</p>',
        avatar: { cloudinaryUrl: 'test.com', cloudinaryPublicId: '1234' },
        urls: {
          website: 'test',
          facebook: 'test',
          instagram: 'test',
          twitter: 'test',
          soundcloud: 'test',
          bandcamp: 'test',
          bio: 'test',
          email: 'test@test.com',
          phone: '0123456789'
        },
        collabOn: []
      }
    }
  }
};

export const MOCK_DELETE_COLLABORATOR = {
  request: {
    query: DELETE_COLLABORATOR,
    variables: { id: '1234' }
  },
  result: {
    data: {
      deleteCollaborator: {
        _id: '1234'
      }
    }
  }
};
