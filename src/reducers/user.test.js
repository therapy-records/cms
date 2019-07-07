import 'core-js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as mockAxios from 'axios';
import {
  userLogin,
  userLogout,
  default as userReducer
} from './user';
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR,
  UISTATE_PROMISE_LOADING,
  ERROR_ALERT
} from '../constants/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = {
  authResponseSuccess: {
    success: true,
    token: 'mock-token'
  },
  authResponseError: {
    success: false,
    message: 'whoops!'
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

describe('(Redux Module) user', () => {
  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(userReducer).to.be.a('function')
    });

    it('should initialize with correct state', () => {
      const state = userReducer(undefined, {});
      expect(state).to.deep.equal({
        isAuth: null
      });
    });
  });

  describe('(Action) userLogin', () => {
    it('should be exported as a function', () => {
      expect(userLogin).to.be.a('function');
    });

    it('should dispatch the correct actions on auth success', () => {
      localStorage.setItem('token', 'testing');
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.post = jest.fn(() => Promise.resolve(mock.authResponseSuccess))

      nock('http://localhost:4040/api')
        .post('/auth/login')
        .reply(200, mock.authResponseSuccess);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
      ];

      return store.dispatch(userLogin()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on auth error', () => {
      nock('http://localhost:4040/api')
        .post('/auth/login')
        .reply(200, mock.authResponseError);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: ERROR_ALERT, payload: mock.authResponseError.message }
      ];

      return store.dispatch(userLogin()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions and message on promise error', () => {
      const mockPromiseError = {
        response: {
          ...mock.authResponseError
        }
      };

      nock('http://localhost:4040/api')
        .post('/auth/login')
        .reply(401, mock.authResponseError);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: ERROR_ALERT, payload: mockPromiseError.response.message }
      ];

      return store.dispatch(userLogin()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions and message on promise error with alternative response object', () => {
      const mockPromiseError = { request: {} };
      mockAxios.post = jest.fn(() => Promise.reject(mockPromiseError));
      nock('http://localhost:4040/api')
        .post('/auth/login')
        .reply(401, mock.authResponseError);

      const expectedActions = [
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: UISTATE_PROMISE_LOADING, payload: false },
        { type: ERROR_ALERT, payload: mock.authResponseError.message }
      ];

      return store.dispatch(userLogin()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });

  describe('(Action) userLogout', () => {
    it('should be exported as a function', () => {
      expect(userLogout).to.be.a('function');
    });

    it('should dispatch the correct actions', () => {
      const expectedActions = [
        { type: USER_AUTH_ERROR, payload: { isAuth: false } }
      ];
      return store.dispatch(userLogout()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });
  });
});
