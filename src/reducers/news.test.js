import 'core-js';

import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import _axiosAuthHeaders from '../utils/axios'

import {
  FETCH_NEWS_ARTICLES_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  EDIT_NEWS_SUCCESS,
  fetchArticlesSuccess,
  fetchNewsArticles,
  postNews,
  editNews,
  default as newsReducer
} from '../reducers/news';
import { SET_SELECTED_NEWS_ARTICLE } from './newsArticle';
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR
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

  it('should export a constant POST_NEWS_FORM_SUCCESS', () => {
    expect(POST_NEWS_FORM_SUCCESS).to.equal('POST_NEWS_FORM_SUCCESS')
  });

  it('should export a constant EDIT_NEWS_SUCCESS', () => {
    expect(EDIT_NEWS_SUCCESS).to.equal('EDIT_NEWS_SUCCESS')
  });

  describe('(Reducer)', () => {
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
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.postNewsResponse));
      nock(API_ROOT + NEWS_CREATE)
        .post(NEWS_CREATE, mock.newsArticle)
        .reply(200, mock.postNewsResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_SUCCESS, payload: mock.postNewsResponse.data }
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
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mock.newsArticle));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(200, mock.newsArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_NEWS_ARTICLE, payload: mock.newsArticle },
        { type: EDIT_NEWS_SUCCESS }
      ];

      store.clearActions();
      return store.dispatch(editNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch setSelectedNewsArticleEditSuccess action with editSuccess added to payload', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mock.newsArticle));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(200, mock.newsArticle);

      store.clearActions();
      return store.dispatch(editNews(mock.newsArticle)).then(() => {
        const storeActions = store.getActions();
        const actionWithEditedArticle = storeActions.find(a => a.type === SET_SELECTED_NEWS_ARTICLE);
        expect(actionWithEditedArticle.payload.editSuccess).to.eq(true);
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
