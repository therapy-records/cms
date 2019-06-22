import 'core-js';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';
import {promiseError} from '../reducers/uiState';
import {
  UISTATE_PROMISE_ERROR,
  ERROR_ALERT,
  ERROR_ALERT_MESSAGE
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

  describe('errorAlertEpic', () => {
    it(`should dispatch correct ${ERROR_ALERT} action`, () => {
      const expectedActions = [
        { type: UISTATE_PROMISE_ERROR, payload: mockErrorResponse.response.status.toString() },
        { type: ERROR_ALERT, payload: ERROR_ALERT_MESSAGE }
      ];

      store.dispatch(promiseError(mockErrorResponse.response.status));
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
      store.clearActions();
    });
  });
});
