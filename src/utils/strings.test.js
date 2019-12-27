import {
  containsNumber,
  isEmptyString
} from './strings';

describe('(Utils) strings', () => {

  describe('containsNumber', () => {

    it('should return true when a string contains a number', () => {
      expect(containsNumber('test01')).to.eq(true);
    });

    it('should return false when a string does NOT contain a number', () => {
      expect(containsNumber('test')).to.eq(false);
    });

  });

  describe('isEmptyString', () => {

    it('should return true when a string is empty', () => {
      expect(isEmptyString("")).to.eq(true);
    });

    it('should return false when a string is NOT empty', () => {
      expect(isEmptyString('not empty')).to.eq(false);
    });

  });

});
