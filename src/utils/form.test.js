import chai, { expect} from 'chai';
import sinon from 'sinon';
import { required } from './form';

describe('(Utils) form', () => {
  describe('when there is a value', () => {
    it('should return undefined string', () => {
      const result = required('a');
      expect(result).to.eq(undefined);
    });
  });
  describe('when there is a value', () => {
    it('should return undefined', () => {
      const result = required('');
      expect(result).to.eq('required');
    });
  });
});
