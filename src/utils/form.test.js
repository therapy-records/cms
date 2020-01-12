import {
  required,
  isFieldArray,
  isFieldArrayWithValuesToMap,
  mapFieldsWithValues
} from './form';

describe('(Utils) form', () => {

  describe('required', () => {

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

  describe('isFieldArray', () => {

    describe('when string includes `arrayOf`', () => {
      it('should return true', () => {
        expect(isFieldArray('arrayOfTest')).to.eq(true);
      });
    });

    describe('when string does NOT include `arrayOf`', () => {
      it('should return true', () => {
        expect(isFieldArray('arrayTest')).to.eq(false);
      });
    });

  });

  describe('isFieldArrayWithValuesToMap', () => {
    describe('when a given object has a matching ID with at least one value in a child object', () => {
      it('should return true', () => {
        const mockField = {
          id: 'urls',
          type: 'arrayOfObjects',
          items: [
            {
              label: 'Website',
              id: 'website',
              type: 'text',
              value: '',
              placeholder: 'test.com' 
            },
            {
              label: 'Instagram',
              id: 'instagram',
              type: 'text',
              value: '',
              placeholder: 'instagram.com/example'
            }
          ]
        };

        const mockValuesObj = {
          title: 'test',
          role: 'testing',
          urls: {
            something: null,
            somethingElse: '',
            website: 'test.com',
            test: null,
          }
        };
        const result = isFieldArrayWithValuesToMap(mockField, mockValuesObj);
        expect(result).to.eq(true);
      });
    });

    describe('when a given object has a matching ID with at least one value in array', () => {
      it('should return true', () => {
        const mockField = {
          id: 'listOfThings',
          type: 'arrayOfStrings',
          items: [
            { value: '' },
            { value: '' }
          ]
        };

        const mockValuesObj = {
          title: 'test',
          role: 'testing',
          listOfThings: [
            '',
            'testing'
          ]
        };
        const result = isFieldArrayWithValuesToMap(mockField, mockValuesObj);
        expect(result).to.eq(true);
      });
    });

  });

  // describe('mapFieldsWithValues', () => {
  //   it('should add a value property to each field that matches in given array', () => {
  //     const mockFields = [
  //       { id: 'name' },
  //       { id: 'about' },
  //       { id: 'somethingElse' },
  //       { id: 'test' }
  //     ];
  //     const mockValuesObj = {
  //       name: 'testing',
  //       about: 'hello world',
  //       test: 'this is a test'
  //     };

  //     const result = mapFieldsWithValues(mockFields, mockValuesObj);
  //     const expected = [
  //       { id: 'name', value: mockValuesObj.name },
  //       { id: 'about', value: mockValuesObj.about },
  //       { id: 'somethingElse' },
  //       { id: 'test', value: mockValuesObj.test }
  //     ];
  //     expect(result).to.deep.eq(expected);
  //   });
  // });

});
