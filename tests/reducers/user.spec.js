import 'core-js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  userLogin,
  userLogout,
  axiosUserLogin,
  default as userReducer
} from 'reducers/user';
import {
  API_ROOT,
  // AUTH,
  AUTH_LOGIN
} from 'constants';
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR
} from 'constants/actions'
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

describe('(Redux Module) user', () => {
  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(userReducer).to.be.a('function')
    });

    it('Should initialize with empty object', () => {
      const state = userReducer(undefined, {});
      expect(state).to.deep.equal({ });
    });
  });

  describe('(Action) userLogin', () => {
    it('should be exported as a function', () => {
      expect(userLogin).to.be.a('function');
    });

    it('should dispatch the correct actions on auth success', () => {
      axiosUserLogin.post = sinon.stub().returns(Promise.resolve(mock.authResponseSuccess));
      nock(API_ROOT + AUTH_LOGIN)
        .post('/login')
        .reply(200, mock.authResponseSuccess);

      const expectedActions = [
        { type: USER_AUTH_SUCCESS, payload: { isAuth: true } }
      ];

      return store.dispatch(userLogin()).then(() => {
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
        store.clearActions();
      });
    });

    it('should dispatch the correct actions on auth error', () => {
      axiosUserLogin.post = sinon.stub().returns(Promise.resolve(mock.authResponseError));
      nock(API_ROOT + AUTH_LOGIN)
        .post('/login')
        .reply(200, mock.authResponseError);

      const expectedActions = [
        { type: USER_AUTH_ERROR, payload: { isAuth: false } }
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
