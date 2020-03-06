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
        { _id: 'abc1', author: 'test', title: 'test', excerpt: 'test', releaseDate: new Date().toISOString() },
        { _id: 'abc2', author: 'testing', title: 'testing', excerpt: 'test', releaseDate: new Date().toISOString() }
      ]
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
        releaseDate: new Date().toISOString()
      }
    }
  }
};
