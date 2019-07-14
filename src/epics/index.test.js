import 'core-js';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';
import {
  promiseError,
  promiseLoading
} from '../actions/uiState';
import { errorAlert } from '../reducers/errorAlert';
import {
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_LOADING,
  ERROR_ALERT,
  RESET_ERROR_ALERT,
  ERROR_ALERT_MESSAGE
} from '../constants/actions'
import rootEpic from './index';

let epicMiddleware = createEpicMiddleware(rootEpic);

let middlewares = [epicMiddleware];

describe('epics', () => {
  let mockStore = configureMockStore(middlewares);

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
    },
    errorAlert: {
      message: undefined
    }
  };

  let store;

  beforeEach(() => {
    epicMiddleware = createEpicMiddleware(rootEpic);
    middlewares = [epicMiddleware];
    mockStore = configureMockStore(middlewares);
  });

  afterEach(() => {
    store.clearActions();
    nock.cleanAll();
  });

  describe('errorAlertEpic', () => {
    it(`should dispatch correct ${ERROR_ALERT} action`, () => {
      const expectedActions = [
        { type: UISTATE_PROMISE_ERROR, payload: true },
        { type: ERROR_ALERT, payload: ERROR_ALERT_MESSAGE }
      ];

      store = mockStore(mockState, {});
      store.dispatch(promiseError());
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
    });
  });

  describe('resetErrorAlertEpic', () => {
    it(`should dispatch correct ${RESET_ERROR_ALERT} action`, () => {
      mockState.errorAlert.message = 'Something has gone wrong.';
      const expectedActions = [
        { type: ERROR_ALERT, payload: 'Something has gone wrong.' },
        { type: UISTATE_PROMISE_LOADING, payload: true },
        { type: RESET_ERROR_ALERT, payload: '' }
      ];

      store = mockStore(mockState, {});
      store.dispatch(errorAlert('Something has gone wrong.'));
      store.dispatch(promiseLoading(true));
      const storeActions = store.getActions();
      expect(storeActions).to.deep.equal(expectedActions);
    });

    describe('when there is NOT state.errorAlert.message', () => {
      it(`should NOT dispatch ${RESET_ERROR_ALERT} action`, () => {
        mockState.errorAlert.message = undefined;
        const expectedActions = [
          { type: UISTATE_PROMISE_LOADING, payload: true }
        ];

        store = mockStore(mockState, {});
        store.dispatch(promiseLoading(true));
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
      });
    });

    describe('when a promiseLoading action\'s payload is FALSE', () => {
      it(`should NOT dispatch ${RESET_ERROR_ALERT} action`, () => {
        mockState.errorAlert.message = undefined;
        const expectedActions = [
          { type: UISTATE_PROMISE_LOADING, payload: false }
        ];

        store = mockStore(mockState, {});
        store.dispatch(promiseLoading(false));
        const storeActions = store.getActions();
        expect(storeActions).to.deep.equal(expectedActions);
      });
    });

  });

});
