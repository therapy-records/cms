import 'core-js';
import {
  initialState,
  errorAlert,
  default as _errorAlertReducer
} from './errorAlert';
import {
  ERROR_ALERT
} from '../constants/actions';

describe('(Actions) errorAlert', () => {

  describe('(Action) errorAlert', () => {
    it('should be exported as a function', () => {
      expect(errorAlert).to.be.a('function');
    });

    it('should return an action with type ERROR_ALERT', () => {
      const mockPayload = 'Oh no!';
      expect(errorAlert(mockPayload)).to.have.property('type', ERROR_ALERT);
      expect(errorAlert(mockPayload)).to.have.property('payload', mockPayload);
    });

    describe('when no payload is provided', () => {
      it('should return an action with empty string apayload', () => {
        expect(errorAlert().type).to.eq(ERROR_ALERT)
        expect(errorAlert('').payload).to.eq('');
      });
    });
  });
});
