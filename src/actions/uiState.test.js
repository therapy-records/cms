import 'core-js';
import {
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState
} from './uiState';
import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions';

describe('(Actions) uiState', () => {

  describe('(Action) promiseLoading', () => {
    it('should be exported as a function', () => {
      expect(promiseLoading).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_LOADING', () => {
      expect(promiseLoading()).to.have.property('type', UISTATE_PROMISE_LOADING);
    });
  });

  describe('(Action) promiseSuccess', () => {
    it('should be exported as a function', () => {
      expect(promiseSuccess).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_SUCCESS', () => {
      expect(promiseSuccess()).to.have.property('type', UISTATE_PROMISE_SUCCESS);
    });
  });

  describe('(Action) promiseError', () => {
    it('should be exported as a function', () => {
      expect(promiseError).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_ERROR', () => {
      expect(promiseError()).to.have.property('type', UISTATE_PROMISE_ERROR);
    });
  });

  describe('(Action) resetPromiseState', () => {
    it('should be exported as a function', () => {
      expect(resetPromiseState).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_SUCCESS_RESET', () => {
      expect(resetPromiseState()).to.have.property('type', UISTATE_PROMISE_SUCCESS_RESET);
    });
  });
});
