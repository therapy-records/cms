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
        { _id: 'abc1', author: 'test', copy: 'test' },
        { _id: 'abc2', author: 'testing', copy: 'test' }
      ]
    }
  }
};

export const MOCK_GET_PRESS_ARTICLE = {
  request: {
    query: GET_PRESS_ARTICLE
  },
  result: {
    data: {
      pressArticle: {
        _id: 'abc1',
        author: 'test',
        copy: 'test',
        externalLink: 'test.com',
        createdAt: 'date'
      }
    }
  }
};
