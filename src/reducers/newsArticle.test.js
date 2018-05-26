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
  SET_SELECTED_NEWS_ARTICLE,
  SET_SELECTED_NEWS_ARTICLE_DELETED,
  DESTROY_SELECTED_NEWS_ARTICLE,
  DELETE_SINGLE_NEWS_ARTICLE_SUCCESS,
  DELETE_SINGLE_NEWS_ARTICLE_ERROR,
  DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS,
  DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR,
  selectedNewsArticle,
  selectedNewsArticleDeleted,
  deleteSuccess,
  deleteQueueArticleSuccess,
  deleteQueueArticleError,
  deleteError,
  setSelectedNewsArticle,
  fetchSingleNewsArticle,
  deleteNewsArticle,
  deleteScheduledArticle,
  destroySelectedNewsArticle,
  default as newsArticleReducer
} from './newsArticle';
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

const mock = {
  getArticleResponse: {
    data: {
      title: 'do something'
    }
  }
};

const mockState = {
  selectedNewsArticle: {}
  // news: {
  //   articles: mock.getNewsResponse.data,
  //   articlesQueue: mock.getNewsResponse.data
  // }
};

const mockErrorResponse = {
  response: { status: 404 }
};

const store = mockStore(mockState);

describe('(Redux Module) newsArticle', () => {

  it('should export a constant SET_SELECTED_NEWS_ARTICLE', () => {
    expect(SET_SELECTED_NEWS_ARTICLE).to.equal('SET_SELECTED_NEWS_ARTICLE')
  });

  it('should export a constant SET_SELECTED_NEWS_ARTICLE_DELETED', () => {
    expect(SET_SELECTED_NEWS_ARTICLE_DELETED).to.equal('SET_SELECTED_NEWS_ARTICLE_DELETED')
  });

  it('should export a constant DESTROY_SELECTED_NEWS_ARTICLE', () => {
    expect(DESTROY_SELECTED_NEWS_ARTICLE).to.equal('DESTROY_SELECTED_NEWS_ARTICLE')
  });

  it('should export a constant DELETE_SINGLE_NEWS_ARTICLE_SUCCESS', () => {
    expect(DELETE_SINGLE_NEWS_ARTICLE_SUCCESS).to.equal('DELETE_SINGLE_NEWS_ARTICLE_SUCCESS')
  });

  it('should export a constant DELETE_SINGLE_NEWS_ARTICLE_ERROR', () => {
    expect(DELETE_SINGLE_NEWS_ARTICLE_ERROR).to.equal('DELETE_SINGLE_NEWS_ARTICLE_ERROR')
  });

  it('should export a constant DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS', () => {
    expect(DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS).to.equal('DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS')
  });

  it('should export a constant DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR', () => {
    expect(DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR).to.equal('DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR')
  });


  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(newsArticleReducer).to.be.a('function')
    });

    it('should initialize with correct state', () => {
      const state = newsArticleReducer(undefined, {});
      expect(state).to.deep.eq({});
    });
  });

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


    it('should update state', () => {
      const mockData1 = { title: 'hello', imageUrl: 'aurl' };
      const mockData2 = { title: 'bonjour', imageUrl: 'test' };
      let state = newsArticleReducer(mockState, selectedNewsArticle(mockData1));
      expect(state).to.deep.eq(mockData1);
      state = newsArticleReducer(state, selectedNewsArticle(mockData2));
      expect(state).to.deep.eq(mockData2);
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

    it('should update state', () => {
      let state = newsArticleReducer(mockState, selectedNewsArticleDeleted());
      expect(state).to.deep.eq({ isDeleted: true });
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


    it('should update state', () => {
      const mockData = { title: 'hello', imageUrl: 'aurl' };
      let state = newsArticleReducer(mockState, deleteSuccess(mockData));
      expect(state).to.deep.eq(mockData);
    });
  });

  describe('(Action) deleteQueueArticleSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(deleteQueueArticleSuccess).to.be.a('function');
    });

    it('should return an action with type DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS', () => {
      expect(deleteQueueArticleSuccess()).to.have.property('type', DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS);
    });

    it('should update state', () => {
      let state = newsArticleReducer(mockState, deleteQueueArticleSuccess());
      expect(state).to.deep.eq({});
    });
  });


  describe('(Action) deleteQueueArticleError', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(deleteQueueArticleError).to.be.a('function');
    });

    it('should return an action with type DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR', () => {
      expect(deleteQueueArticleError()).to.have.property('type', DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR);
    });

    it('should update state', () => {
      let state = newsArticleReducer(mockState, deleteQueueArticleError());
      expect(state).to.deep.eq({ error: true });
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

    it('should update state', () => {
      let state = newsArticleReducer(mockState, deleteError());
      expect(state).to.deep.eq({ error: true });
    });
  });

  describe('(Action) setSelectedNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(setSelectedNewsArticle).to.be.a('function');
    });
  });

  describe('(Action) destroySelectedNewsArticle', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(destroySelectedNewsArticle).to.be.a('function');
    });

    it('should update state', () => {
      let state = newsArticleReducer(mockState, destroySelectedNewsArticle());
      expect(state).to.deep.eq({selectedNewsArticle: {}});
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
  });

  describe('(Thunk) deleteScheduledArticle', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(deleteScheduledArticle).to.be.a('function');
    });

    it('should return a function', () => {
      expect(deleteScheduledArticle()).to.be.a('function');
    });
  });
});
