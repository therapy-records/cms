import {
  arrayOfObjectsHasValues
} from './arrays';

describe('(Utils) arrays', () => {

  describe('arrayOfObjectsHasValues', () => {

    it('should return false when no objects in the array have a value', () => {
      const mock = [
        { value: '' },
        { value: "" },
        { value: '' },
        {}
      ];
      expect(arrayOfObjectsHasValues(mock)).to.eq(false);
    });

    it('should return true when a single object in the array has a value', () => {
      const mock = [
        { value: '' },
        { value: 'test' },
        { value: '' }
      ];
      expect(arrayOfObjectsHasValues(mock)).to.eq(true);
    });

    it('should return true when multiple objects in the array have a value', () => {
      const mock = [
        { value: '' },
        { value: 'test' },
        { value: 'testing' },
        {},
        { value: '' }
      ];
      expect(arrayOfObjectsHasValues(mock)).to.eq(true);
    });

  });

});
