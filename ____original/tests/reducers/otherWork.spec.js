import 'core-js';
import axios from 'axios';
import _axiosAuthHeaders from 'utils/axios'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  FETCH_OTHER_WORK_ARTICLES_SUCCESS,
  POST_OTHER_WORK_FORM_SUCCESS,
  EDIT_OTHER_WORK_SUCCESS,
  fetchArticlesSuccess,
  fetchOtherWorkArticles,
  postOtherWork,
  editOtherWork,
  default as otherWorkReducer
} from 'reducers/otherWork';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR
} from 'reducers/uiState'
import {
  API_ROOT,
  OTHER_WORK,
  OTHER_WORK_CREATE
} from 'constants';

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

const store = mockStore(mockState);

describe('(Redux Module) news', () => {
  it('Should export a constant FETCH_OTHER_WORK_ARTICLES_SUCCESS', () => {
    expect(FETCH_OTHER_WORK_ARTICLES_SUCCESS).to.equal('FETCH_OTHER_WORK_ARTICLES_SUCCESS')
  });

  it('Should export a constant POST_OTHER_WORK_FORM_SUCCESS', () => {
    expect(POST_OTHER_WORK_FORM_SUCCESS).to.equal('POST_OTHER_WORK_FORM_SUCCESS')
  });

  it('Should export a constant EDIT_OTHER_WORK_SUCCESS', () => {
    expect(EDIT_OTHER_WORK_SUCCESS).to.equal('EDIT_OTHER_WORK_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(otherWorkReducer).to.be.a('function')
    });

    it('Should initialize with correct empty arrays', () => {
      const state = otherWorkReducer(undefined, {});
      expect(state).to.deep.equal(
        { articles: [] }
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

    it('should return an action with type FETCH_OTHER_WORK_ARTICLES_SUCCESS', () => {
      expect(fetchArticlesSuccess()).to.have.property('type', FETCH_OTHER_WORK_ARTICLES_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchArticlesSuccess(mockData)).to.have.property('payload', mockData);
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = otherWorkReducer(state, fetchArticlesSuccess(mockData1));
      expect(state.articles).to.deep.equal(mockData1);
      state = otherWorkReducer(state, fetchArticlesSuccess(mockData2))
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
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject({ error: true }));
      nock(API_ROOT + OTHER_WORK_CREATE)
        .post(OTHER_WORK_CREATE, mock.article);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: true }
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
