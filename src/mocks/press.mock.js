import {
  GET_PRESS
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
