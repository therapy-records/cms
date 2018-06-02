import 'core-js';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';
import {
  initialState,
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState,
  default as uiStateReducer
} from '../reducers/uiState';
import {
  UISTATE_PROMISE_ERROR,
  USER_AUTH_ERROR
} from '../constants/actions'
import rootEpic from './index';

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [epicMiddleware];
const mockStore = configureMockStore(middlewares);

const mockErrorResponse = {
  response: { status: '401' }
};

const mockState = {
  user: {
    isAuth: true
  },
  uiState: {
    promiseLoading: false,
    promiseSuccess: false,
    promiseError: false
  }
};

const store = mockStore(mockState, {});

describe('epics', () => {
  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(rootEpic);
  });

  describe('authCheckEpic', () => {
    it(`should dispatch correct ${USER_AUTH_ERROR} action`, () => {
      const expectedActions = [
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status.toString() },
        { type: USER_AUTH_ERROR,
          payload: {
            isAuth: false,
            authError: mockErrorResponse.response.status
          }
        }
      ];

      store.dispatch(promiseError(mockErrorResponse.response.status));
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
      store.clearActions();
    });
  });
});
