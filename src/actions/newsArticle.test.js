import 'core-js';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import _axiosAuthHeaders from '../utils/axios'
import {
  selectedNewsArticle,
  selectedNewsArticleDeleted,
  deleteSuccess,
  deleteError,
  setSelectedNewsArticle,
  fetchSingleNewsArticle,
  deleteNewsArticle,
  destroySelectedNewsArticle
} from './newsArticle';
import { INITIAL_STATE } from '../reducers/newsArticle';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  SET_SELECTED_NEWS_ARTICLE,
  SET_SELECTED_NEWS_ARTICLE_DELETED,
  DESTROY_SELECTED_NEWS_ARTICLE,
  DELETE_SINGLE_NEWS_ARTICLE_SUCCESS,
  DELETE_SINGLE_NEWS_ARTICLE_ERROR,
  FETCH_NEWS_ARTICLES_SUCCESS
} from '../constants/actions';
import {
  API_ROOT,
  NEWS
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = {
  getArticleResponse: {
    data: {
      title: 'test title'
    }
  }
};

const mockState = INITIAL_STATE;

const store = mockStore(mockState);

describe('(Actions) newsArticle', () => {

  describe('(Action) selectedNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(selectedNewsArticle).to.be.a('function');
    });

    it('should return an action with type SET_SELECTED_NEWS_ARTICLE', () => {
      expect(selectedNewsArticle()).to.have.property('type', SET_SELECTED_NEWS_ARTICLE);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = { title: 'something' };
      expect(selectedNewsArticle(mockData)).to.have.property('payload', mockData);
    });
  });

  describe('(Action) selectedNewsArticleDeleted', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(selectedNewsArticleDeleted).to.be.a('function');
    });

    it('should return an action with type SET_SELECTED_NEWS_ARTICLE_DELETED', () => {
      expect(selectedNewsArticleDeleted()).to.have.property('type', SET_SELECTED_NEWS_ARTICLE_DELETED);
    });
  });

  describe('(Action) deleteSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(deleteSuccess).to.be.a('function');
    });

    it('should return an action with type DELETE_SINGLE_NEWS_ARTICLE_SUCCESS', () => {
      expect(deleteSuccess()).to.have.property('type', DELETE_SINGLE_NEWS_ARTICLE_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = { title: 'something' };
      expect(deleteSuccess(mockData)).to.have.property('payload', mockData);
    });
  });

  describe('(Action) deleteError', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(deleteError).to.be.a('function');
    });

    it('should return an action with type DELETE_SINGLE_NEWS_ARTICLE_ERROR', () => {
      expect(deleteError()).to.have.property('type', DELETE_SINGLE_NEWS_ARTICLE_ERROR);
    });
  });

  describe('(Action) setSelectedNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(setSelectedNewsArticle).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      const mockArticle = { title: 'test' };
      const expectedActions = [
        { type: SET_SELECTED_NEWS_ARTICLE, payload: mockArticle }
      ];
      store.clearActions();
      store.dispatch(setSelectedNewsArticle(mockArticle));
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
      store.clearActions();
    });
  });

  describe('(Action) destroySelectedNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(destroySelectedNewsArticle).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      const expectedActions = [
        { type: DESTROY_SELECTED_NEWS_ARTICLE, payload: {} }
      ];
      store.clearActions();
      store.dispatch(destroySelectedNewsArticle());
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
      store.clearActions();
    });
  });

  describe('(Thunk) fetchSingleNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchSingleNewsArticle).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchSingleNewsArticle()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      axios.get = sinon.stub().returns(Promise.resolve(mock.getArticleResponse));
      nock(API_ROOT + NEWS)
        .get('/news')
        .reply(200, mock.getArticleResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_NEWS_ARTICLE, payload: mock.getArticleResponse.data }
      ];
      store.clearActions();
      return store.dispatch(fetchSingleNewsArticle()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

    
  describe('(Thunk) deleteNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(deleteNewsArticle).to.be.a('function');
    });

    it('should return a function', () => {
      expect(deleteNewsArticle()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      _axiosAuthHeaders.delete = sinon.stub().returns(Promise.resolve({}));
      nock('http://localhost:4040/api/news')
        .delete('/news', {})
        .reply(200, {
          status: 200
        });

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: DELETE_SINGLE_NEWS_ARTICLE_SUCCESS, payload: {} },
        { type: SET_SELECTED_NEWS_ARTICLE_DELETED, payload: { isDeleted: true } },
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_NEWS_ARTICLES_SUCCESS, payload: mock.getArticleResponse.data },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];
      store.clearActions();
      return store.dispatch(deleteNewsArticle()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

  });
});
