import 'core-js';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import _axiosAuthHeaders from '../utils/axios'

import {
  FETCH_NEWS_ARTICLES_SUCCESS,
  FETCH_NEWS_ARTICLES_QUEUE_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  POST_NEWS_FORM_QUEUE_SUCCESS,
  EDIT_NEWS_SUCCESS,
  EDIT_NEWS_QUEUE_SUCCESS,
  fetchArticlesSuccess,
  fetchNewsArticles,
  axiosNewsQueueArticles,
  fetchNewsQueueArticles,
  postNews,
  postNewsQueue,
  editNews,
  editNewsQueue,
  default as newsReducer
} from '../reducers/news';
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE,
  NEWS_QUEUE
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockNewsArticle = {
  _id: 'xcxcxcxcxccx1234',
  title: 'hello',
  createdAt: new Date(),
  bodyMain: '<p>test</p>',
  mainImage: {
    url: 'http://image.com',
    externalLink: 'test.com'
  },
  ticketsLink: '',
  venueLink: '',
  miniGalleryImages: [
    'asdf.jpg', 'qweqwe.jpg'
  ],
  videoEmbed: 'http://asdf.com/dfdf'
};

const mockNewsArticleQueue = mockNewsArticle;
mockNewsArticleQueue.scheduledTime = new Date();

const mock = {
  getNewsResponse: {
    data: [
      { title: 'do something' },
      { title: 'do something else' }
    ]
  },
  newsArticle: mockNewsArticle,
  newsArticleQueue: mockNewsArticleQueue
};

const mockState = {
  news: {
    articles: mock.getNewsResponse.data,
    articlesQueue: mock.getNewsResponse.data
  },
  form: {
    NEWS_ARTICLE_FORM: {
      values: mock.newsArticle
    }
  }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Redux Module) news', () => {
  it('should export a constant FETCH_NEWS_ARTICLES_SUCCESS', () => {
    expect(FETCH_NEWS_ARTICLES_SUCCESS).to.equal('FETCH_NEWS_ARTICLES_SUCCESS')
  });

  it('should export a constant FETCH_NEWS_ARTICLES_QUEUE_SUCCESS', () => {
    expect(FETCH_NEWS_ARTICLES_QUEUE_SUCCESS).to.equal('FETCH_NEWS_ARTICLES_QUEUE_SUCCESS')
  });

  it('should export a constant POST_NEWS_FORM_SUCCESS', () => {
    expect(POST_NEWS_FORM_SUCCESS).to.equal('POST_NEWS_FORM_SUCCESS')
  });

  it('should export a constant POST_NEWS_FORM_QUEUE_SUCCESS', () => {
    expect(POST_NEWS_FORM_QUEUE_SUCCESS).to.equal('POST_NEWS_FORM_QUEUE_SUCCESS')
  });

  it('should export a constant EDIT_NEWS_SUCCESS', () => {
    expect(EDIT_NEWS_SUCCESS).to.equal('EDIT_NEWS_SUCCESS')
  });

  it('should export a constant EDIT_NEWS_QUEUE_SUCCESS', () => {
    expect(EDIT_NEWS_QUEUE_SUCCESS).to.equal('EDIT_NEWS_QUEUE_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(newsReducer).to.be.a('function')
    });

    it('should initialize with correct state', () => {
      const state = newsReducer(undefined, {});
      expect(state).to.deep.equal(
        { articles: null, articlesQueue: null }
      );
    });
  });

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
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchArticlesSuccess(mockData)).to.have.property('payload', mockData);
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = newsReducer(mockState, fetchArticlesSuccess(mockData1));
      expect(state.articles).to.deep.equal(mockData1);
      state = newsReducer(state, fetchArticlesSuccess(mockData2))
      expect(state.articles).to.deep.equal(mockData2);
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
      axios.get = sinon.stub().returns(Promise.resolve(mock.getNewsResponse));
      nock(API_ROOT + NEWS)
        .get('/news')
        .reply(200, mock.getNewsResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_NEWS_ARTICLES_SUCCESS, payload: mock.getNewsResponse.data },
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
  });

  describe('(Thunk) fetchNewsQueueArticles', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchNewsQueueArticles).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchNewsQueueArticles()).to.be.a('function');
    });

    // TODO: it should dispatch fetchNewsArticles, fetchNewsQueueArticles
    it('should dispatch the correct actions', () => {
      axiosNewsQueueArticles.get = sinon.stub().returns(Promise.resolve(mock.getNewsResponse));
      nock(API_ROOT + NEWS_QUEUE)
        .get('/news')
        .reply(200, mock.getNewsResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: FETCH_NEWS_ARTICLES_QUEUE_SUCCESS, payload: mock.getNewsResponse.data }
      ];
      store.clearActions();
      return store.dispatch(fetchNewsQueueArticles()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
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
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.newsArticle));
      nock(API_ROOT + NEWS_CREATE)
        .post(NEWS_CREATE, mock.newsArticle)
        .reply(200, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_SUCCESS, payload: mock.newsArticle }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + NEWS_CREATE)
        .post(NEWS_CREATE, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) postNewsQueue', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should be exported as a function', () => {
      expect(postNewsQueue).to.be.a('function');
    });

    it('should return a function', () => {
      expect(postNewsQueue()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.newsArticleQueue));
      nock(API_ROOT + NEWS_QUEUE)
        .post(NEWS_QUEUE, mock.newsArticleQueue)
        .reply(200, mock.newsArticleQueue);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_QUEUE_SUCCESS, payload: [] }
      ];

      store.clearActions();
      return store.dispatch(postNewsQueue(mock.newsArticleQueue)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + NEWS_QUEUE)
        .post(NEWS_QUEUE, mock.newsArticleQueue);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status }
      ];

      store.clearActions();
      return store.dispatch(postNewsQueue(mock.newsArticleQueue)).then(() => {
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
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mock.newsArticle));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(200, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: EDIT_NEWS_SUCCESS }
      ];

      store.clearActions();
      return store.dispatch(editNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(500);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status }
      ];

      return store.dispatch(editNews({})).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) editNewsQueue', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should be exported as a function', () => {
      expect(editNewsQueue).to.be.a('function');
    });

    it('should return a function', () => {
      expect(editNewsQueue()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mock.newsArticle));
      nock(API_ROOT + NEWS_QUEUE + 'asdf1234')
        .put(`${NEWS_QUEUE}asdf1234`, {})
        .reply(200, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: EDIT_NEWS_QUEUE_SUCCESS }
      ];

      store.clearActions();
      return store.dispatch(editNewsQueue(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(500);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status }
      ];

      return store.dispatch(editNewsQueue({})).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
