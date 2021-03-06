import errorAlertReducer, { INITIAL_STATE } from './errorAlert';
import { errorAlert, resetErrorAlert } from '../actions/errorAlert';

describe('(Reducer) errorAlert', () => {

  it('should be a function', () => {
    expect(errorAlertReducer).to.be.a('function')
  });

  it('should initialize with correct fields', () => {
    const state = errorAlertReducer(undefined, {});
    expect(state).to.deep.equal({
      message: ''
    });
  });

  describe('ERROR_ALERT', () => {
    it('should update state', () => {
      let state = errorAlertReducer(INITIAL_STATE, errorAlert('Oh no!'));
      expect(state).to.deep.equal({
        message: 'Oh no!'
      });
      state = errorAlertReducer(INITIAL_STATE, errorAlert());
      expect(state).to.deep.equal({
        message: ''
      });
    });
  });

  describe('RESET_ERROR_ALERT', () => {
    it('should update state', () => {
      let state = errorAlertReducer(INITIAL_STATE, resetErrorAlert('Oh no!'));
      expect(state).to.deep.equal({
        message: ''
      });
    });
  });

});
