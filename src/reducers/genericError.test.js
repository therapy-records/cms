import 'core-js';

import {
  initialState,
  genericError,
  default as _genericErrorReducer
} from './genericError';
import {
  GENERIC_ERROR
} from '../constants/actions';

describe('(Redux Module) genericError', () => {
  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(_genericErrorReducer).to.be.a('function')
    });

    it('should initialize with correct fields', () => {
      const state = _genericErrorReducer(undefined, {});
      expect(state).to.deep.equal({
        message: ''
      });
    });
  });

  describe('(Action) genericError', () => {
    it('should be exported as a function', () => {
      expect(genericError).to.be.a('function');
    });

    it('should return an action with type GENERIC_ERROR', () => {
      expect(genericError()).to.have.property('type', GENERIC_ERROR);
    });

    it('should update state', () => {
      let state = _genericErrorReducer(initialState, genericError('Oh no!'));
      expect(state).to.deep.equal({
        message: 'Oh no!'
      });
      state = _genericErrorReducer(initialState, genericError());
      expect(state).to.deep.equal({
        message: ''
      });
    });
  });
});
