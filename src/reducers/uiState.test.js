import uiStateReducer, { INITIAL_STATE } from './uiState';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions';
import {
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState
} from '../actions/uiState';


describe('(Reducer) uiState', () => {

  it('should be a function', () => {
    expect(uiStateReducer).to.be.a('function')
  });

  it('should initialize with correct state', () => {
    const state = uiStateReducer(undefined, {});
    expect(state).to.deep.equal({
      promiseLoading: false,
      promiseSuccess: false,
      promiseError: false
    });
  });

  describe('UISTATE_PROMISE_LOADING', () => {
    it('should update state', () => {
      let state = uiStateReducer(INITIAL_STATE, promiseLoading(true));
      expect(state).to.deep.eq({
        promiseLoading: true,
        promiseSuccess: false,
        promiseError: false
      });
      state = uiStateReducer(INITIAL_STATE, promiseLoading(false));
      expect(state).to.deep.eq({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('UISTATE_PROMISE_SUCCESS', () => {
    it('should update state', () => {
      let state = uiStateReducer(INITIAL_STATE, promiseSuccess(true));
      expect(state).to.deep.eq({
        promiseLoading: false,
        promiseSuccess: true,
        promiseError: false
      });
      state = uiStateReducer(INITIAL_STATE, promiseSuccess(false));
      expect(state).to.deep.eq({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('UISTATE_PROMISE_ERROR', () => {
    it('should update state', () => {
      let state = uiStateReducer(INITIAL_STATE, promiseError());
      expect(state).to.deep.eq({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: true
      });
    });
  });

  describe('UISTATE_PROMISE_SUCCESS_RESET', () => {
    it('should update state', () => {
      const mockState = {
        promiseLoading: true,
        promiseSuccess: true,
        promiseError: true
      };
      let state = uiStateReducer(mockState, resetPromiseState());
      expect(state).to.deep.eq({
        promiseLoading: true,
        promiseSuccess: false,
        promiseError: true
      });
    });
  });

});
