
import {
  selectUiState,
  selectUiStateLoading,
  selectUiStateSuccess,
  selectUiStateError
} from './uiState';

const mockState = {
  uiState: {
    promiseLoading: true,
    promiseSuccess: true,
    promiseError: true
  }
};

describe('(Selectors) uiState', () => {

  describe('selectUiState', () => {
    it('should return uiState', () => {
      const actual = selectUiState(mockState);
      expect(actual).to.deep.equal(mockState.uiState);
    });
  });

  describe('selectUiStateLoading', () => {
    it('should return uiState', () => {
      const actual = selectUiStateLoading(mockState);
      expect(actual).to.deep.equal(mockState.uiState.promiseLoading);
    });
  });

  describe('selectUiStateSuccess', () => {
    it('should return uiState', () => {
      const actual = selectUiStateSuccess(mockState);
      expect(actual).to.deep.equal(mockState.uiState.promiseSuccess);
    });
  });

  describe('selectUiStateError', () => {
    it('should return uiState', () => {
      const actual = selectUiStateError(mockState);
      expect(actual).to.deep.equal(mockState.uiState.promiseError);
    });
  });

});
