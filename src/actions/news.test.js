import 'core-js';
import * as mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  fetchArticlesSuccess,
  fetchNewsArticles,
  postNews,
  editNews
} from '../actions/news';
import {
  NEWS_CREATE
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  FETCH_NEWS_ARTICLES_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  EDIT_NEWS_SUCCESS,
  SET_SELECTED_NEWS_ARTICLE
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
  getNewsResponse: [
      { title: 'do something' },
      { title: 'do something else' }
  ],
  postNewsResponse: {
    title: 'do something'
  },
  newsArticle: mockNewsArticle
};

const mockState = {
  news: {
    articles: mock.getNewsResponse,
    hasFetched: false
  },
  form: {
    NEWS_FORM: {
      values: mockNewsArticle
    }
  }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Actions) news', () => {
  
  describe('(Action) fetchArticlesSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(fetchArticlesSuccess).to.be.a('function');
    });

    it('should return an action with type FETCH_NEWS_ARTICLES_SUCCESS', () => {
      expect(fetchArticlesSuccess()).to.have.property('type', FETCH_NEWS_ARTICLES_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [{ title: 'something' }, { title: 'test' }];
      expect(fetchArticlesSuccess(mockData)).to.have.property('payload', mockData);
    });
  });

  describe('(Thunk) fetchNewsArticles', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchNewsArticles).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchNewsArticles()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      mockAxios.get = sinon.stub().returns(Promise.resolve(mock.getNewsResponse));
      nock('http://localhost:4040/api')
        .get('/news')
        .reply(200, mock.getNewsResponse);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_NEWS_ARTICLES_SUCCESS, payload: mock.getNewsResponse },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];
      store.clearActions();
      return store.dispatch(fetchNewsArticles()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    describe('on promise error', () => {
      it('should dispatch the correct actions', () => {
        mockAxios.get = jest.fn(() => Promise.reject(mock.getNewsResponse))
        nock('http://localhost:4040/api')
          .get('/news')
          .reply(500, mock.getNewsResponse);

        const expectedActions = [
          { type: UISTATE_PROMISE_LOADING, payload: true },
          { type: UISTATE_PROMISE_LOADING, payload: false },
          { type: UISTATE_PROMISE_ERROR, payload: true }
        ];
        store.clearActions();
        return store.dispatch(fetchNewsArticles()).then(() => {
          const storeActions = store.getActions();
          expect(storeActions).to.deep.equal(expectedActions);
          store.clearActions();
        });
      });
    });
  });

  describe('(Thunk) postNews', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(postNews).to.be.a('function');
    });

    it('should return a function', () => {
      expect(postNews()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      localStorage.setItem('token', 'testing');
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.post = jest.fn(() => Promise.resolve(mock.postNewsResponse))

      nock('http://localhost:4040/api')
        .post('/news')
        .reply(200, mock.postNewsResponse);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_SUCCESS, payload: mock.postNewsResponse }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      // _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject(mockErrorResponse));
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.post = jest.fn(() => Promise.resolve(mock.mockErrorResponse))

      nock('http://localhost:4040/api')
        .post(NEWS_CREATE, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: true }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) editNews', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should be exported as a function', () => {
      expect(editNews).to.be.a('function');
    });

    it('should return a function', () => {
      expect(editNews()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.put = jest.fn(() => Promise.resolve(mockNewsArticle))

      nock(`http://localhost:4040/api/news`)
        .put(`/${mockNewsArticle._id}`)
        .reply(200, mockNewsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_NEWS_ARTICLE, payload: mockNewsArticle },
        { type: EDIT_NEWS_SUCCESS, payload: true }
      ];

      store.clearActions();
      return store.dispatch(editNews(mockNewsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[3].type).to.deep.equal(expectedActions[3].type);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.put = jest.fn(() => Promise.reject(mockErrorResponse))

      nock(`http://localhost:4040/api/news`)
        .put(`/${mockNewsArticle._id}`)
        .reply(500);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: true }
      ];

      return store.dispatch(editNews({})).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
