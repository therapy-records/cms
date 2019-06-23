import 'core-js';

import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import _axiosAuthHeaders from '../utils/axios'
import {
  FETCH_JOURNALISM_ARTICLES_SUCCESS,
  POST_JOURNALISM_FORM_SUCCESS,
  EDIT_JOURNALISM_SUCCESS,
  fetchJournalismArticlesSuccess,
  fetchJournalismArticles,
  postJournalism,
  editJournalism,
  default as journalismReducer
} from './journalism';
import {
  API_ROOT,
  JOURNALISM,
  JOURNALISM_CREATE
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR
} from '../constants/actions';
import { SET_SELECTED_JOURNALISM_ARTICLE } from './journalismArticle';

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
  getJournalismResponse: {
    data: [
      { title: 'do something' },
      { title: 'do something else' }
    ]
  },
  postJournalismResponse: {
    data: {
      title: 'do something'
    }
  },
  article: mockArticle
};

const mockState = {
  journalism: {
    articles: mock.getJournalismResponse.data
  },
  form: {
    JOURNALISM_ARTICLE_FORM: {
      values: mock.article
    }
  }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Redux Module) news', () => {
  it('should export a constant FETCH_JOURNALISM_ARTICLES_SUCCESS', () => {
    expect(FETCH_JOURNALISM_ARTICLES_SUCCESS).to.equal('FETCH_JOURNALISM_ARTICLES_SUCCESS')
  });

  it('should export a constant POST_JOURNALISM_FORM_SUCCESS', () => {
    expect(POST_JOURNALISM_FORM_SUCCESS).to.equal('POST_JOURNALISM_FORM_SUCCESS')
  });

  it('should export a constant EDIT_JOURNALISM_SUCCESS', () => {
    expect(EDIT_JOURNALISM_SUCCESS).to.equal('EDIT_JOURNALISM_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(journalismReducer).to.be.a('function')
    });

    it('should initialize with correct state', () => {
      const state = journalismReducer(undefined, {});
      expect(state).to.deep.equal(
        { articles: null }
      );
    });
  });

  describe('(Action) fetchJournalismArticlesSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(fetchJournalismArticlesSuccess).to.be.a('function');
    });

    it('should return an action with type FETCH_JOURNALISM_ARTICLES_SUCCESS', () => {
      expect(fetchJournalismArticlesSuccess()).to.have.property('type', FETCH_JOURNALISM_ARTICLES_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchJournalismArticlesSuccess(mockData)).to.have.property('payload', mockData);
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = journalismReducer(mockState, fetchJournalismArticlesSuccess(mockData1));
      expect(state.articles).to.deep.equal(mockData1);
      state = journalismReducer(state, fetchJournalismArticlesSuccess(mockData2))
      expect(state.articles).to.deep.equal(mockData2);
    });
  });

  describe('(Thunk) fetchJournalismArticles', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchJournalismArticles).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchJournalismArticles()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      axios.get = sinon.stub().returns(Promise.resolve(mock.getJournalismResponse));
      nock(API_ROOT + JOURNALISM)
        .get('/news')
        .reply(200, mock.getJournalismResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_JOURNALISM_ARTICLES_SUCCESS, payload: mock.getJournalismResponse.data },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];
      store.clearActions();
      return store.dispatch(fetchJournalismArticles()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) postJournalism', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(postJournalism).to.be.a('function');
    });

    it('should return a function', () => {
      expect(postJournalism()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.postJournalismResponse));
      nock(API_ROOT + JOURNALISM_CREATE)
        .post(JOURNALISM_CREATE, mock.article)
        .reply(200, mock.article);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_JOURNALISM_FORM_SUCCESS, payload: mock.postJournalismResponse.data }
      ];

      store.clearActions();
      return store.dispatch(postJournalism(mock.article)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + JOURNALISM_CREATE)
        .post(JOURNALISM_CREATE, mock.article);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: true }
      ];

      store.clearActions();
      return store.dispatch(postJournalism(mock.article)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
  describe('(Thunk) editJournalism', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should be exported as a function', () => {
      expect(editJournalism).to.be.a('function');
    });

    it('should return a function', () => {
      expect(editJournalism()).to.be.a('function');
    });

    it('should dispatch the correct actions on success', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mockArticle));
      nock(API_ROOT + JOURNALISM + 'asdf1234')
        .put(`${JOURNALISM}asdf1234`, {})
        .reply(200, mockArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_JOURNALISM_ARTICLE, payload: mockArticle },
        { type: EDIT_JOURNALISM_SUCCESS }
      ];

      store.clearActions();
      return store.dispatch(editJournalism(mockArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[3].type).to.deep.equal(expectedActions[3].type);
        store.clearActions();
      });
    });

    it('should dispatch setSelectedJournalismArticle action with editSuccess added to payload', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mockArticle));
      nock(API_ROOT + JOURNALISM + 'asdf1234')
        .put(`${JOURNALISM}asdf1234`, {})
        .reply(200, mockArticle);

      store.clearActions();
      return store.dispatch(editJournalism(mockArticle)).then(() => {
        const storeActions = store.getActions();
        const actionWithEditedArticle = storeActions.find(a => a.type === SET_SELECTED_JOURNALISM_ARTICLE);
        expect(actionWithEditedArticle.payload.editSuccess).to.eq(true);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.reject(mockErrorResponse));
      nock(API_ROOT + JOURNALISM + 'asdf1234')
        .put(`${JOURNALISM}asdf1234`, {})
        .reply(500);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: true }
      ];

      return store.dispatch(editJournalism({})).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
