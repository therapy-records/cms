import 'core-js';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  selectedJournalismArticle,
  selectedJournalismArticleDeleted,
  deleteSuccess,
  deleteError,
  fetchSingleJournalismArticle,
  deleteJournalismArticle,
  destroySelectedJournalismArticle
} from './journalismArticle';
import { INITIAL_STATE } from '../reducers/journalismArticle';
import {
  API_ROOT,
  JOURNALISM
} from '../constants';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  SET_SELECTED_JOURNALISM_ARTICLE,
  SET_SELECTED_JOURNALISM_ARTICLE_DELETED,
  DESTROY_SELECTED_JOURNALISM_ARTICLE,
  DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS,
  DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = {
  getArticleResponse: {
    data: {
      title: 'do something'
    }
  }
};

const mockState = INITIAL_STATE;

const store = mockStore(mockState);

describe('(Actions) journalismArticle', () => {

  describe('(Action) selectedJournalismArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(selectedJournalismArticle).to.be.a('function');
    });

    it('should return an action with type SET_SELECTED_JOURNALISM_ARTICLE', () => {
      expect(selectedJournalismArticle()).to.have.property('type', SET_SELECTED_JOURNALISM_ARTICLE);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = { title: 'something' };
      expect(selectedJournalismArticle(mockData)).to.have.property('payload', mockData);
    });
  });

  describe('(Action) selectedJournalismArticleDeleted', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(selectedJournalismArticleDeleted).to.be.a('function');
    });

    it('should return an action with type SET_SELECTED_JOURNALISM_ARTICLE_DELETED', () => {
      expect(selectedJournalismArticleDeleted()).to.have.property('type', SET_SELECTED_JOURNALISM_ARTICLE_DELETED);
    });

  });

  describe('(Action) deleteSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(deleteSuccess).to.be.a('function');
    });

    it('should return an action with type DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS', () => {
      expect(deleteSuccess()).to.have.property('type', DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS);
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

    it('should return an action with type DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR', () => {
      expect(deleteError()).to.have.property('type', DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR);
    });

  });

  describe('(Action) destroySelectedJournalismArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(destroySelectedJournalismArticle).to.be.a('function');
    });
  });

  describe('(Action) destroySelectedJournalismArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(destroySelectedJournalismArticle).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      const expectedActions = [
        { type: DESTROY_SELECTED_JOURNALISM_ARTICLE, payload: {} }
      ];
      store.clearActions();
      store.dispatch(destroySelectedJournalismArticle());
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
      store.clearActions();
    });
  });

  describe('(Thunk) fetchSingleJournalismArticle', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchSingleJournalismArticle).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchSingleJournalismArticle()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      axios.get = sinon.stub().returns(Promise.resolve(mock.getArticleResponse));
      nock(API_ROOT + JOURNALISM)
        .get('/journalism')
        .reply(200, mock.getArticleResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: SET_SELECTED_JOURNALISM_ARTICLE, payload: mock.getArticleResponse.data }
      ];
      store.clearActions();
      return store.dispatch(fetchSingleJournalismArticle()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) deleteJournalismArticle', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(deleteJournalismArticle).to.be.a('function');
    });

    it('should return a function', () => {
      expect(deleteJournalismArticle()).to.be.a('function');
    });
  });

});
