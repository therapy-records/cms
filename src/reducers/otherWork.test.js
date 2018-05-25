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
  FETCH_OTHER_WORK_ARTICLES_SUCCESS,
  POST_OTHER_WORK_FORM_SUCCESS,
  EDIT_OTHER_WORK_SUCCESS,
  fetchOtherWorkArticlesSuccess,
  fetchOtherWorkArticles,
  postOtherWork,
  editOtherWork,
  default as otherWorkReducer
} from './otherWork';
import {
  API_ROOT,
  OTHER_WORK,
  OTHER_WORK_CREATE
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockArticle = {
  _id: 'asdfsaf',
  title: 'hello',
  copy: 'world',
  mainImageUrl: 'http://image.com',
  externalLink: 'test.com',
  releaseDate: new Date()
};

const mock = {
  getOtherWorkResponse: {
    data: [
      { title: 'do something' },
      { title: 'do something else' }
    ]
  },
  article: mockArticle
};

const mockState = {
  otherWork: {
    articles: mock.getOtherWorkResponse.data
  },
  form: {
    OTHER_WORK_ARTICLE_FORM: {
      values: mock.article
    }
  }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Redux Module) news', () => {
  it('should export a constant FETCH_OTHER_WORK_ARTICLES_SUCCESS', () => {
    expect(FETCH_OTHER_WORK_ARTICLES_SUCCESS).to.equal('FETCH_OTHER_WORK_ARTICLES_SUCCESS')
  });

  it('should export a constant POST_OTHER_WORK_FORM_SUCCESS', () => {
    expect(POST_OTHER_WORK_FORM_SUCCESS).to.equal('POST_OTHER_WORK_FORM_SUCCESS')
  });

  it('should export a constant EDIT_OTHER_WORK_SUCCESS', () => {
    expect(EDIT_OTHER_WORK_SUCCESS).to.equal('EDIT_OTHER_WORK_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(otherWorkReducer).to.be.a('function')
    });

    it('should initialize with correct state', () => {
      const state = otherWorkReducer(undefined, {});
      expect(state).to.deep.equal(
        { articles: null }
      );
    });
  });

  describe('(Action) fetchOtherWorkArticlesSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(fetchOtherWorkArticlesSuccess).to.be.a('function');
    });

    it('should return an action with type FETCH_OTHER_WORK_ARTICLES_SUCCESS', () => {
      expect(fetchOtherWorkArticlesSuccess()).to.have.property('type', FETCH_OTHER_WORK_ARTICLES_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchOtherWorkArticlesSuccess(mockData)).to.have.property('payload', mockData);
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = otherWorkReducer(mockState, fetchOtherWorkArticlesSuccess(mockData1));
      expect(state.articles).to.deep.equal(mockData1);
      state = otherWorkReducer(state, fetchOtherWorkArticlesSuccess(mockData2))
      expect(state.articles).to.deep.equal(mockData2);
    });
  });

  describe('(Thunk) fetchOtherWorkArticles', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchOtherWorkArticles).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchOtherWorkArticles()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      axios.get = sinon.stub().returns(Promise.resolve(mock.getOtherWorkResponse));
      nock(API_ROOT + OTHER_WORK)
        .get('/news')
        .reply(200, mock.getOtherWorkResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_OTHER_WORK_ARTICLES_SUCCESS, payload: mock.getOtherWorkResponse.data },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];
      store.clearActions();
      return store.dispatch(fetchOtherWorkArticles()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) postOtherWork', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(postOtherWork).to.be.a('function');
    });

    it('should return a function', () => {
      expect(postOtherWork()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.article));
      nock(API_ROOT + OTHER_WORK_CREATE)
        .post(OTHER_WORK_CREATE, mock.article)
        .reply(200, mock.article);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_OTHER_WORK_FORM_SUCCESS, payload: mock.article }
      ];

      store.clearActions();
      return store.dispatch(postOtherWork(mock.article)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + OTHER_WORK_CREATE)
        .post(OTHER_WORK_CREATE, mock.article);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status }
      ];

      store.clearActions();
      return store.dispatch(postOtherWork(mock.article)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
