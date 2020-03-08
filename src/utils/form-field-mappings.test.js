import mapFieldsWithValues, {
  isFieldArray,
  isFieldArrayWithValues,
  mapFieldArrayOfObjectsWithValues,
  mapFieldArrayOfStringsWithValues,
  mapFieldArray,
  mapFields
} from './form-field-mappings';

describe('(Utils) form-field-mappings', () => {

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

  describe('isFieldArrayWithValues', () => {
    describe('when a given object has a matching ID with at least one value in a child object', () => {
      it('should return true', () => {
        const mockField = {
          id: 'urls',
          type: 'arrayOfObjects',
          items: [
            { id: 'website' },
            { id: 'instagram' }
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
        const result = isFieldArrayWithValues(mockField.id, mockValuesObj);
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
        const result = isFieldArrayWithValues(mockField.id, mockValuesObj);
        expect(result).to.eq(true);
      });
    });

  });

  describe('mapFieldArrayOfObjectsWithValues', () => {
    describe('when given a field with items array and an object that has matching ID with a value', () => {
      it('should return the field with updated value', () => {
        const mockField = {
          id: 'urls',
          type: 'arrayOfObjects',
          items: [
            { id: 'website', value: '' },
            { id: 'instagram', value: '' }
          ]
        };

        const mockValuesObj = {
          title: 'test',
          role: 'testing',
          urls: {
            something: null,
            website: 'test.com',
            instagram: 'instagram.com'
          }
        };
        const result = mapFieldArrayOfObjectsWithValues(mockField, mockValuesObj);
        expect(result).to.deep.eq({
          ...mockField,
          items: [
            { id: 'website', value: mockValuesObj.urls.website },
            { id: 'instagram', value: mockValuesObj.urls.instagram }
          ]
        });
      });
    });
  });

  describe('mapFieldArrayOfStringsWithValues', () => {

    describe('when given a field with items array and an object with array of strings', () => {
      it('should return the field with updated items array from valuesObject', () => {
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
            'a',
            'b',
            'c'
          ]
        };
        const result = mapFieldArrayOfStringsWithValues(mockField, mockValuesObj);
        expect(result).to.deep.eq({
          ...mockField,
          items: [
            { value: 'a' },
            { value: 'b' },
            { value: 'c' }
          ]
        })
      });
    });
  });

  describe('mapFieldArray', () => {
    describe('when the field type is `arrayOfObjects`', () => {
      it('should return the mapped field', () => {
        const mockField = {
          id: 'urls',
          type: 'arrayOfObjects',
          items: [
            { id: 'website', value: '' },
            { id: 'instagram', value: '' }
          ]
        };
        const mockValuesObj = {
          title: 'testing',
          urls: {
            website: 'test.com',
            instagram: null
          }
        };
        const result = mapFieldArray(mockField, mockValuesObj);
        const expected = mapFieldArrayOfObjectsWithValues(mockField, mockValuesObj);
        expect(result).to.deep.eq(expected);
      });
    });

    describe('when the field type is `arrayOfStrings`', () => {
      it('should return the mapped field', () => {
        const mockField = {
          id: 'listOfThings',
          type: 'arrayOfStrings',
          items: []
        };

        const mockValuesObj = {
          title: 'testing',
          listOfThings: [
            'a',
            'b',
            'c'
          ]
        };
        const result = mapFieldArray(mockField, mockValuesObj);
        const expected = mapFieldArrayOfStringsWithValues(mockField, mockValuesObj);
        expect(result).to.deep.eq(expected);
      });
    });

  });

  describe('mapFieldsWithValues', () => {
    it('should return string or array mapped fields', () => {
      const mockFieldsArray = [
        { id: 'a', type: 'string' },
        { id: 'b', type: 'string' },
        {
          id: 'c',
          type: 'arrayOfObjects',
          items: [
            { id: 'website', value: '' },
            { id: 'instagram', value: '' }
          ]
        },
        {
          id: 'd',
          type: 'arrayOfStrings',
          items: [
            { value: '' },
            { value: '' }
          ]
        }
      ];

      const mockValuesObj = {
        a: 'testing',
        b: 'test',
        c: {
          website: 'test.com',
          instagram: 'testing.com'
        },
        d: [
          'test',
          'testing'
        ]
      };

      const result = mapFieldsWithValues(mockFieldsArray, mockValuesObj);

      const expected = [
        { id: 'a', type: 'string', value: mockValuesObj.a },
        { id: 'b', type: 'string', value: mockValuesObj.b },
        { ...mapFieldArrayOfObjectsWithValues(mockFieldsArray[2], mockValuesObj) },
        { ...mapFieldArrayOfStringsWithValues(mockFieldsArray[3], mockValuesObj) }
      ];
      expect(result).to.deep.eq(expected);
    });
  });

  describe('mapFields', () => {
    it('should return an array with empty value properties', () => {
      const mockFields = [
        { id: 'a', value: 'testing' },
        { id: 'b', value: 'testing' },
        { id: 'c', value: 'testing' }
      ];
      const result = mapFields(mockFields);
      expect(result).to.deep.eq([
        { id: 'a', value: '' },
        { id: 'b', value: '' },
        { id: 'c', value: '' }
      ]);
    });
  });

});
