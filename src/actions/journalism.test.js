import 'core-js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as mockAxios from 'axios';
import {
  fetchJournalismArticlesSuccess,
  fetchJournalismArticles,
  postJournalism,
  editJournalism
} from './journalism';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  FETCH_JOURNALISM_ARTICLES_SUCCESS,
  POST_JOURNALISM_FORM_SUCCESS,
  EDIT_JOURNALISM_SUCCESS,
  SET_SELECTED_JOURNALISM_ARTICLE
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockArticle = {
  _id: 'asdfsaf',
  title: 'hello',
  copy: 'world',
  category: 'Other',
  imageUrl: 'http://image.com',
  externalLink: 'test.com',
  releaseDate: new Date()
};

const mock = {
  getJournalismResponse: [
      { title: 'do something' },
      { title: 'do something else' }
  ],
  postJournalismResponse: {
    title: 'do something'
  },
  article: mockArticle
};

const mockState = {
  journalism: {
    articles: mock.getJournalismResponse
  },
  form: {
    JOURNALISM_FORM: {
      values: mock.article
    }
  }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Actions) journalism', () => {
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
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.get = jest.fn(() => Promise.resolve(mock.getJournalismResponse))

      nock('http://localhost:4040/api')
        .get('/journalism')
        .reply(200, mock.getJournalismResponse);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_JOURNALISM_ARTICLES_SUCCESS, payload: mock.getJournalismResponse },
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

    describe('on promise error', () => {
      it('should dispatch the correct actions', () => {
        mockAxios.get = jest.fn(() => Promise.reject(mock.getJournalismResponse))
        nock('http://localhost:4040/api')
          .get('/journalism')
          .reply(500, mock.getJournalismResponse);

        const expectedActions = [
          { type: UISTATE_PROMISE_LOADING, payload: true },
          { type: UISTATE_PROMISE_LOADING, payload: false },
          { type: UISTATE_PROMISE_ERROR, payload: true }
        ];
        store.clearActions();
        return store.dispatch(fetchJournalismArticles()).then(() => {
          const storeActions = store.getActions();
          expect(storeActions).to.deep.equal(expectedActions);
          store.clearActions();
        });
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
      localStorage.setItem('token', 'testing');
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.post = jest.fn(() => Promise.resolve(mock.postJournalismResponse))

      nock('http://localhost:4040/api')
        .post('/journalism')
        .reply(200, mock.postJournalismResponse);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_JOURNALISM_FORM_SUCCESS, payload: mock.postJournalismResponse }
      ];

      store.clearActions();
      return store.dispatch(postJournalism(mock.article)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      localStorage.setItem('token', 'testing');
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.post = jest.fn(() => Promise.resolve(mockErrorResponse))

      nock('http://localhost:4040/api')
        .post('/journalism', mock.article)

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
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.put = jest.fn(() => Promise.resolve(mockArticle))

      nock(`http://localhost:4040/api/journalism`)
        .put(`/${mockArticle._id}`)
        .reply(200, mockArticle);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_JOURNALISM_ARTICLE, payload: mockArticle },
        { type: EDIT_JOURNALISM_SUCCESS, payload: true }
      ];

      store.clearActions();
      return store.dispatch(editJournalism(mockArticle)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[3].type).to.deep.equal(expectedActions[3].type);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.put = jest.fn(() => Promise.reject(mockErrorResponse));

      nock(`http://localhost:4040/api/journalism`)
        .put(`/${mockArticle._id}`)
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
