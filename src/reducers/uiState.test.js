import 'core-js';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
  initialState,
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET,
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState,
  default as uiStateReducer
} from './uiState';

describe('(Redux Module) uiState', () => {
  it('Should export a constant UISTATE_PROMISE_LOADING', () => {
    expect(UISTATE_PROMISE_LOADING).to.equal('UISTATE_PROMISE_LOADING')
  });
  it('Should export a constant UISTATE_PROMISE_SUCCESS', () => {
    expect(UISTATE_PROMISE_SUCCESS).to.equal('UISTATE_PROMISE_SUCCESS')
  });
  it('Should export a constant UISTATE_PROMISE_ERROR', () => {
    expect(UISTATE_PROMISE_ERROR).to.equal('UISTATE_PROMISE_ERROR')
  });
  it('Should export a constant UISTATE_PROMISE_SUCCESS_RESET', () => {
    expect(UISTATE_PROMISE_SUCCESS_RESET).to.equal('UISTATE_PROMISE_SUCCESS_RESET')
  });
  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(uiStateReducer).to.be.a('function')
    });

    it('Should initialize with correct fields', () => {
      const state = uiStateReducer(undefined, {});
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('(Action) promiseLoading', () => {
    it('should be exported as a function', () => {
      expect(promiseLoading).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_LOADING', () => {
      expect(promiseLoading()).to.have.property('type', UISTATE_PROMISE_LOADING);
    });

    it('should update state', () => {
      let state = uiStateReducer(initialState, promiseLoading(true));
      expect(state).to.deep.equal({
        promiseLoading: true,
        promiseSuccess: false,
        promiseError: false
      });
      state = uiStateReducer(initialState, promiseLoading(false));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('(Action) promiseSuccess', () => {
    it('should be exported as a function', () => {
      expect(promiseSuccess).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_SUCCESS', () => {
      expect(promiseSuccess()).to.have.property('type', UISTATE_PROMISE_SUCCESS);
    });

    it('should update state', () => {
      let state = uiStateReducer(initialState, promiseSuccess(true));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: true,
        promiseError: false
      });
      state = uiStateReducer(initialState, promiseSuccess(false));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('(Action) promiseError', () => {
    it('should be exported as a function', () => {
      expect(promiseError).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_ERROR', () => {
      expect(promiseError()).to.have.property('type', UISTATE_PROMISE_ERROR);
    });

    it('should update state', () => {
      let state = uiStateReducer(initialState, promiseError(true));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: true
      });
      state = uiStateReducer(initialState, promiseError(false));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });

  describe('(Action) resetPromiseState', () => {
    it('should be exported as a function', () => {
      expect(resetPromiseState).to.be.a('function');
    });

    it('should return an action with type UISTATE_PROMISE_SUCCESS_RESET', () => {
      expect(resetPromiseState()).to.have.property('type', UISTATE_PROMISE_SUCCESS_RESET);
    });

    it('should update state', () => {
      let state = uiStateReducer(initialState, promiseSuccess(true));
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: true,
        promiseError: false
      });
      state = uiStateReducer(initialState, resetPromiseState());
      expect(state).to.deep.equal({
        promiseLoading: false,
        promiseSuccess: false,
        promiseError: false
      });
    });
  });
});
