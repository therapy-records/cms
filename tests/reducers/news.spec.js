import 'core-js';
import axios from 'axios';
import _axiosAuthHeaders from 'utils/axios'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  FETCH_NEWS_POSTS_SUCCESS,
  FETCH_NEWS_POSTS_QUEUE_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  POST_NEWS_FORM_QUEUE_SUCCESS,
  fetchPostsSuccess,
  // fetchQueueSuccess,
  // postNewsSuccess,
  // postNewsQueueSucces,
  fetchNewsPosts,
  fetchNewsQueuePosts,
  postNews,
  postNewsQueue,
  editNews,
  default as newsReducer
} from 'reducers/news';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR
} from 'reducers/uiState'
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE,
  NEWS_QUEUE
} from 'constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockNewsPost = {
  _id: 'xcxcxcxcxccx1234',
  title: 'hello',
  createdAt: new Date(),
  bodyMain: '<p>test</p>',
  mainImageUrl: '',
  ticketsLink: '',
  venueLink: '',
  miniGalleryImages: [
    'asdf.jpg', 'qweqwe.jpg'
  ],
  videoEmbed: 'http://asdf.com/dfdf'
};

const mockNewsPostQueue = mockNewsPost;
mockNewsPostQueue.scheduledTime = new Date();

const mock = {
  getNewsResponse: {
    data: [
      { title: 'do something' },
      { title: 'do something else' }
    ]
  },
  newsPost: mockNewsPost,
  newsPostQueue: mockNewsPostQueue
};

const mockState = {
  news: {
    posts: mock.getNewsResponse.data,
    postsQueue: mock.getNewsResponse.data
  },
  form: {
    NEWS_POST_FORM: {
      values: mock.newsPost
    }
  }
};

const store = mockStore(mockState);

describe('(Redux Module) news', () => {
  it('Should export a constant FETCH_NEWS_POSTS_SUCCESS', () => {
    expect(FETCH_NEWS_POSTS_SUCCESS).to.equal('FETCH_NEWS_POSTS_SUCCESS')
  });

  it('Should export a constant FETCH_NEWS_POSTS_SUCCESS', () => {
    expect(FETCH_NEWS_POSTS_QUEUE_SUCCESS).to.equal('FETCH_NEWS_POSTS_QUEUE_SUCCESS')
  });

  it('Should export a constant POST_NEWS_FORM_SUCCESS', () => {
    expect(POST_NEWS_FORM_SUCCESS).to.equal('POST_NEWS_FORM_SUCCESS')
  });

  it('Should export a constant POST_NEWS_FORM_QUEUE_SUCCESS', () => {
    expect(POST_NEWS_FORM_QUEUE_SUCCESS).to.equal('POST_NEWS_FORM_QUEUE_SUCCESS')
  });

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(newsReducer).to.be.a('function')
    });

    it('Should initialize with an empty array of posts', () => {
      const state = newsReducer(undefined, {});
      expect(state).to.deep.equal(
        { posts: [], postsQueue: [] }
      );
    });
  });

  describe('(Action) fetchPostsSuccess', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(fetchPostsSuccess).to.be.a('function');
    });

    it('should return an action with type FETCH_NEWS_POSTS_SUCCESS', () => {
      expect(fetchPostsSuccess()).to.have.property('type', FETCH_NEWS_POSTS_SUCCESS);
    });

    it('should assign the first argument to the payload property', () => {
      const mockData = [ { title: 'something' }, { title: 'test' } ];
      expect(fetchPostsSuccess(mockData)).to.have.property('payload', mockData);
    });

    it('should update state', () => {
      const mockData1 = [ { title: 'something' }, { title: 'test' } ];
      const mockData2 = [ { title: 'hello' }, { title: 'bonjour' } ];
      let state = newsReducer(state, fetchPostsSuccess(mockData1));
      expect(state.posts).to.deep.equal(mockData1);
      state = newsReducer(state, fetchPostsSuccess(mockData2))
      expect(state.posts).to.deep.equal(mockData2);
    });
  });

  describe('(Thunk) fetchNewsPosts', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchNewsPosts).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchNewsPosts()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      axios.get = sinon.stub().returns(Promise.resolve(mock.getNewsResponse));
      nock(API_ROOT + NEWS)
        .get('/news')
        .reply(200, mock.getNewsResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: FETCH_NEWS_POSTS_SUCCESS, payload: mock.getNewsResponse.data },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];
      store.clearActions();
      return store.dispatch(fetchNewsPosts()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Thunk) fetchNewsQueuePosts', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should be exported as a function', () => {
      expect(fetchNewsQueuePosts).to.be.a('function');
    });

    it('should return a function', () => {
      expect(fetchNewsQueuePosts()).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      _axiosAuthHeaders.get = sinon.stub().returns(Promise.resolve(mock.getNewsResponse));
      nock(API_ROOT + NEWS_QUEUE)
        .get('/news')
        .reply(200, mock.getNewsResponse.data);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: FETCH_NEWS_POSTS_QUEUE_SUCCESS, payload: mock.getNewsResponse.data }
      ];
      store.clearActions();
      return store.dispatch(fetchNewsQueuePosts()).then(() => {
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
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.newsPost));
      nock(API_ROOT + NEWS_CREATE)
        .post(NEWS_CREATE, mock.newsPost)
        .reply(200, mock.newsPost);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_SUCCESS, payload: mock.newsPost }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsPost)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject({ error: true }));
      nock(API_ROOT + NEWS_CREATE)
        .post(NEWS_CREATE, mock.newsPost);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: { error: true } }
      ];

      store.clearActions();
      return store.dispatch(postNews(mock.newsPost)).then(() => {
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
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.newsPostQueue));
      nock(API_ROOT + NEWS_QUEUE)
        .post(NEWS_QUEUE, mock.newsPostQueue)
        .reply(200, mock.newsPostQueue);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true },
        { type: POST_NEWS_FORM_QUEUE_SUCCESS, payload: [] }
      ];

      store.clearActions();
      return store.dispatch(postNewsQueue(mock.newsPostQueue)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.post = sinon.stub().returns(Promise.reject({ error: true }));
      nock(API_ROOT + NEWS_QUEUE)
        .post(NEWS_QUEUE, mock.newsPostQueue);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: { error: true } }
      ];

      store.clearActions();
      return store.dispatch(postNewsQueue(mock.newsPostQueue)).then(() => {
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
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.resolve(mock.newsPost));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(200, mock.newsPost);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_SUCCESS, payload: true }
      ];

      store.clearActions();
      return store.dispatch(editNews(mock.newsPost)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on error', () => {
      _axiosAuthHeaders.put = sinon.stub().returns(Promise.reject({ error: true }));
      nock(API_ROOT + NEWS + 'asdf1234')
        .put(`${NEWS}asdf1234`, {})
        .reply(500);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: UISTATE_PROMISE_ERROR, payload: { error: true } }
      ];

      return store.dispatch(editNews({})).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
