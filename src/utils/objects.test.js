import {
  isAnObject,
  objectHasValues
} from './objects';

describe('(Utils) objects', () => {

  describe('isAnObject', () => {

    it('should return true when is an object', () => {
      expect(isAnObject({})).to.eq(true);
      expect(isAnObject({ test: true })).to.eq(true);
      expect(isAnObject({ test: 'yes' })).to.eq(true);
    });

    it('should return false when NOT an object or is null', () => {
      expect(isAnObject(0)).to.eq(false);
      expect(isAnObject(true)).to.eq(false);
      expect(isAnObject(null)).to.eq(false);
      expect(isAnObject([])).to.eq(false);
      expect(isAnObject(() => 'test')).to.eq(false);
    });

  });

  describe('objectHasValues', () => {

    it('should return true when an object contains values', () => {
      expect(objectHasValues({
        test: true
      })).to.eq(true);

      expect(objectHasValues({
        test: null,
        testing: true,
        tester: ''
      })).to.eq(true);
    });

    it('should return false when an object does NOT contain a single value', () => {
      expect(objectHasValues({
        test: null
      })).to.eq(false);

      expect(objectHasValues({
        test: ''
      })).to.eq(false);

      expect(objectHasValues({
        test: null,
        testing: '',
        tester: ""
      })).to.eq(false);

    });

  });

});
