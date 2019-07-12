import 'core-js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as mockAxios from 'axios';
import {
  API_ROOT,
  AUTH
} from '../constants';
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR
} from '../constants/actions'
import { authCheck } from '../actions/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = {
  authResponseSuccess: {
    success: true
  },
  authResponseError: {
    success: false,
    message: 'oh no!'
  },
  loginForm: {
    username: 'admin',
    password: 'password'
  }
};
const mockState = {
  form: {
    LOGIN_FORM: {
      values: mock.loginForm
    }
  }
};
const mockDispatch = {
  authSuccess: () => {},
  authError: () => {}
}

const store = mockStore(mockState, mockDispatch);

describe('(Actions) auth', () => {

  beforeEach(() => {
    mockAxios.create = jest.fn(() => mockAxios);
  });

  describe('(Thunk) authCheck', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(authCheck).to.be.a('function');
    });

    it('should return a function', () => {
      expect(authCheck()).to.be.a('function');
    });

    describe('when a token exists', () => {
      describe('when the promise resolves successfully', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', 'tony-testing');
          mockAxios.post = jest.fn(() => Promise.resolve({}))

          nock('http://localhost:4040/api')
            .post('/auth')
            .reply(200, {});

          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } }
          ];

          return store.dispatch(authCheck()).then(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the promise resolves successfully and api returns success property', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', 'tony-testing');
          mockAxios.post = jest.fn(() => Promise.resolve(mock.authResponseSuccess))

          nock('http://localhost:4040/api')
            .post('/auth')
            .reply(200, mock.authResponseSuccess);

          const expectedActions = [
            { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
          ];

          return store.dispatch(authCheck()).then(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the api errors', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', 'tony-testing');
          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } }
          ];

          return store.dispatch(authCheck()).then(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the promise rejects/api errors', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', '');
          mockAxios.post = jest.fn(() => Promise.reject(new Error('oh no')));

          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
          ];

          return store.dispatch(authCheck()).catch(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });
    });

    describe('when a token does NOT exist', () => {
      describe('when the promise resolves successfully', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', '');
          mockAxios.post = jest.fn(() => Promise.resolve({}));

          nock('http://localhost:4040/api')
            .post('/auth')
            .reply(200, {});

          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } }
          ];

          return store.dispatch(authCheck()).then(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the promise resolves successfully and api returns success property', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', '');
          mockAxios.post = jest.fn(() => Promise.resolve(mock.authResponseSuccess));

          nock('http://localhost:4040/api')
            .post('/auth')
            .reply(200, mock.authResponseSuccess);

          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
          ];

          return store.dispatch(authCheck()).then(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the api errors', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', '');
          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } }
          ];

          return store.dispatch(authCheck()).catch(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

      describe('when the promise rejects/api errors', () => {
        it('should dispatch the correct actions', () => {
          localStorage.setItem('token', '');
          mockAxios.post = jest.fn(() => Promise.reject(new Error('oh no')));

          const expectedActions = [
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
            { type: USER_AUTH_ERROR, payload: { isAuth: false } },
          ];

          return store.dispatch(authCheck()).catch(() => {
            const storeActions = store.getActions();
            expect(storeActions).to.deep.equal(expectedActions);
            store.clearActions();
          });
        });
      });

    });

  });
});
