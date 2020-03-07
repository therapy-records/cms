import { GET_STATS } from '../queries';

export const MOCK_GET_STATS = {
  request: {
    query: GET_STATS
  },
  result: {
    data: {
      news: [
        { title: 'a' },
        { title: 'b' },
        { title: 'c' }
      ],
      journalism: [
        { title: 'a' },
        { title: 'b' },
        { title: 'c' }
      ],
      collaborators: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
      ],
      press: [
        { author: 'a' },
        { author: 'b' },
        { author: 'c' }
      ]
    }
  }
};
