import {
  GET_PRESS,
  GET_PRESS_ARTICLE
} from '../queries';

export const MOCK_GET_PRESS = {
  request: {
    query: GET_PRESS
  },
  result: {
    data: {
      press: [
        {
          _id: 'abc1',
          author: 'test',
          title: 'test',
          category: 'Mock category A',
          excerpt: 'test',
          releaseDate: new Date().toISOString(),
          image: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234'
          }
        },
        {
          _id: 'abc2',
          author: 'testing',
          title: 'testing',
          category: 'Mock category A',
          excerpt: 'test',
          releaseDate: new Date().toISOString(),
          image: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234'
          }
        }
      ]
    }
  }
};

export const MOCK_GET_PRESS_EMPTY = {
  request: {
    query: GET_PRESS
  },
  result: {
    data: {
      press: []
    }
  }
};

export const MOCK_GET_PRESS_ARTICLE = {
  request: {
    query: GET_PRESS_ARTICLE,
    variables: { id: '1234' }
  },
  result: {
    data: {
      pressArticle: {
        _id: '1234',
        author: 'test',
        title: 'test title',
        excerpt: 'test',
        externalLink: 'test.com',
        releaseDate: new Date().toISOString(),
        image: {
          cloudinaryUrl: 'test.com',
          cloudinaryPublicId: '1234'
        },
        category: 'Mock category A'
      }
    }
  }
};
