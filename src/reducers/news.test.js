import newsReducer from '../reducers/news';
import {
  fetchArticlesSuccess,
  postNewsSuccess
} from '../actions/news';

let mockNewsArticle = {
  _id: 'xcxcxcxcxccx1234',
  title: 'hello',
  createdAt: new Date(),
  sections: [
    {
      copy: 'testing',
      images: [
        { url: 'test.com' },
        { url: 'test2.com' }
      ]
    }
  ]
};

const mock = {
  getNewsResponse: {
    data: [
      { title: 'do something' },
      { title: 'do something else' }
    ]
  },
  postNewsResponse: {
    data: {
      title: 'do something'
    }
  },
  newsArticle: mockNewsArticle
};

const mockState = {
  news: {
    articles: mock.getNewsResponse.data,
    hasFetched: false
  },
  form: {
    NEWS_FORM: {
      values: mockNewsArticle
    }
  }
};

describe('(Reducer) news', () => {
  it('should be a function', () => {
    expect(newsReducer).to.be.a('function')
  });

  it('should initialize with correct state', () => {
    const state = newsReducer(undefined, {});
    expect(state).to.deep.equal(
      {
        articles: null,
        hasFetched: false
      }
    );
  });

  describe('FETCH_NEWS_ARTICLES_SUCCESS', () => {
    it('should update state', () => {
      const mockData1 = [{ title: 'something' }, { title: 'test' }];
      const mockData2 = [{ title: 'hello' }, { title: 'bonjour' }];
      let state = newsReducer(mockState.news, fetchArticlesSuccess(mockData1));
      expect(state).to.deep.eq({
        articles: mockData1,
        hasFetched: true
      });
      state = newsReducer(mockState.news, fetchArticlesSuccess(mockData2));
      expect(state).to.deep.eq({
        articles: mockData2,
        hasFetched: true
      });
    });
  });

  describe('POST_NEWS_FORM_SUCCESS', () => {
    it('should update state', () => {
      const mockArticle = { title: 'something' };
      const mockArticle2 = { title: 'something else' };
      let state = newsReducer(mockState.news, postNewsSuccess(mockArticle));
      expect(state).to.deep.eq({
        articles: [
          ...mockState.news.articles,
          mockArticle
        ],
        hasFetched: false
      });
      state = newsReducer(mockState.news, postNewsSuccess(mockArticle2));
      expect(state).to.deep.eq({
        articles: [
          ...mockState.news.articles,
          mockArticle2
        ],
        hasFetched: false
      });
    });
  });

});
