import 'core-js';
import _axiosAuthHeaders from 'utils/axios'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  API_ROOT,
  AUTH
  // AUTH_LOGIN
} from 'constants';
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR
} from 'constants/actions'
import { authCheck, routeAuthCheck } from 'actions/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = {
  authResponseSuccess: {
    data: {
      success: true
    }
  },
  authResponseError: {
    data: {
      success: false
    }
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

    // todo: why getting 'network error' issues with nock/axios?

    // it('should dispatch the correct actions on auth success', () => {
    //   _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.authResponseSuccess));
    //   nock(API_ROOT + AUTH)
    //     .post('/auth')
    //     .reply(200, mock.authResponseSuccess);

    //   const expectedActions = [
    //     { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
    //   ];

    //   return store.dispatch(authCheck()).then(() => {
    //     const storeActions = store.getActions();
    //     expect(storeActions).to.deep.equal(expectedActions);
    //     store.clearActions();
    //   });
    // });

    // it('should dispatch the correct actions on auth error', () => {
    //   _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.authResponseError));
    //   nock(API_ROOT + AUTH)
    //     .post('/auth')
    //     .reply(200, mock.authResponseError);

    //   const expectedActions = [
    //     { type: USER_AUTH_ERROR, payload: { isAuth: false } }
    //   ];

    //   return store.dispatch(authCheck()).then(() => {
    //     const storeActions = store.getActions();
    //     expect(storeActions).to.deep.equal(expectedActions);
    //     store.clearActions();
    //   });
    // });
  });

  describe('(Thunk) routeAuthCheck', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should be exported as a function', () => {
      expect(routeAuthCheck).to.be.a('function');
    });

    it('should return a function', () => {
      expect(routeAuthCheck()).to.be.a('function');
    });

    // todo: why getting 'network error' issues with nock/axios?

    // it('should dispatch the correct actions on auth success', () => {
    //   axios.create().post = sinon.stub().returns(Promise.resolve(mock.authResponseSuccess));
    //   nock(API_ROOT + AUTH)
    //     .post('/auth')
    //     .reply(200, mock.authResponseSuccess.data);

    //   const expectedActions = [
    //     { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
    //   ];

    //   return store.dispatch(routeAuthCheck()).then(() => {
    //     const storeActions = store.getActions();
    //     expect(storeActions).to.deep.equal(expectedActions);
    //     store.clearActions();
    //   });
    // });

    // it('should dispatch the correct actions on auth error', () => {
    //   _axiosAuthHeaders.post = sinon.stub().returns(Promise.resolve(mock.authResponseError.data));
    //   nock(API_ROOT + AUTH)
    //     .post('/auth')
    //     .reply(200, mock.authResponseError.data);

    //   const expectedActions = [
    //     { type: USER_AUTH_ERROR, payload: { isAuth: false } }
    //   ];

    //   return store.dispatch(routeAuthCheck()).then(() => {
    //     const storeActions = store.getActions();
    //     expect(storeActions).to.deep.equal(expectedActions);
    //     store.clearActions();
    //   });
    // });
  });
});
