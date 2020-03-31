import {
  GET_GIGS
} from '../queries';

export const MOCK_GET_GIGS = {
  request: {
    query: GET_GIGS
  },
  result: {
    data: {
      gigs: [
        { _id: 'abc1', title: 'test', location: 'test', venue: 'test', ticketsUrl: 'test.com', date: new Date().toISOString() },
        { _id: 'abc2', title: 'testing', location: 'testing', venue: 'test', ticketsUrl: 'test.com', date: new Date().toISOString() }
      ]
    }
  }
};
