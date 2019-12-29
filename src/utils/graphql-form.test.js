import React from 'react';
import {
  isChildField,
  getChildFieldIds,
  formatChildField,
  handleChildFieldArray,
  handleChildField,
  handleFormData
} from './graphql-form';

describe('(Utils) graphql-form', () => {

  describe('isChildField', () => {

    describe('when a given id includes `.`', () => {
      it('should return true', () => {
        expect(isChildField('myField.nestedId')).to.eq(true);
      });
    });

    describe('when a given id does NOT include `.`', () => {
      it('should return false', () => {
        expect(isChildField('myField')).to.eq(false);
      });
    });

  });

  describe('getChildFieldIds', () => {

    describe('when a grandChildFieldId contains a number', () => {
      it('should only return the childFieldId', () => {
        const mockFieldId = 'myFieldArray.0';
        const result = getChildFieldIds(mockFieldId);
        expect(result).to.deep.eq({
          childFieldId: 'myFieldArray'
        });
      });
    });

    describe('when a grandChildFieldId does NOT contain a number', () => {
      it('should return the childFieldId and grandChildFieldId', () => {
        const mockFieldId = 'myFieldObject.locationLink';
        const result = getChildFieldIds(mockFieldId);
        expect(result).to.deep.eq({
          childFieldId: 'myFieldObject',
          grandChildFieldId: 'locationLink'
        });
      });
    });

  });

  describe('formatChildField', () => {
    describe('when there is a grandChildFieldId', () => {
      it('should return an object with the property name as the grandChildFieldId', () => {
        const mockFieldId = 'myFieldObject.locationLink';
        const mockFieldValue = 'testing';
        const result = formatChildField(mockFieldId, mockFieldValue);

        const expectedGrandChildFieldId = 'locationLink';
        expect(result).to.deep.eq({
          [expectedGrandChildFieldId]: mockFieldValue
        });
      });
    });

    describe('when there is NOT grandChildFieldId', () => {
      it('should return just the field value', () => {
        const mockFieldId = 'myFieldArray.0';
        const mockFieldValue = 'testing';
        const result = formatChildField(mockFieldId, mockFieldValue);

        expect(result).to.deep.eq(mockFieldValue);
      });
    });

  });

  describe('handleChildFieldArray', () => {
    const mockAllChildFields = {
      collabOn: [
        'aaaa',
        'bbb'
      ],
      urls: {
        website: 'test.com',
        twitter: 'twitter.com'
      }
    };

    describe('with an empty string fieldValue param', () => {
      it('should return the passed `allChildFields`', () => {
        const result = handleChildFieldArray(
          mockAllChildFields,
          '',
          'someFieldId'
        );
        expect(result).to.deep.eq(mockAllChildFields);
      });
    });

    describe('when there is an existing array for a given fieldId', () => {
      it('should add a fieldValue to the array', () => {
        const mockFieldValue = 'testing';

        const result = handleChildFieldArray(
          mockAllChildFields,
          mockFieldValue,
          'collabOn'
        );

        const expected = {
          ...mockAllChildFields,
          collabOn: [
            mockAllChildFields.collabOn[0],
            mockAllChildFields.collabOn[1],
            mockFieldValue
          ]
        };
        expect(result).to.deep.eq(expected);
      });
    });

    describe('when there is NOT an existing array for a given fieldId', () => {
      it('should add a fieldValue to the array', () => {
        const mockFieldValue = 'test';
        const mockChildFieldId = 'newFieldName';

        const result = handleChildFieldArray(
          mockAllChildFields,
          mockFieldValue,
          mockChildFieldId
        );

        const expected = {
          ...mockAllChildFields,
          [mockChildFieldId]: [
            mockFieldValue
          ]
        };
        expect(result).to.deep.eq(expected);
      });
    });

  });

  describe('handleChildField', () => {

    describe('with a child field that is a string', () => {
      it('should add the child field string to the parent array', () => {
        const mockFieldId = 'newFieldName.0';
        const mockFieldValue = 'test';
        const mockAllChildFields = {
          test: true
        };
        const result = handleChildField(
          mockFieldId,
          mockFieldValue,
          mockAllChildFields
        );

        expect(result).to.deep.eq({
          ...mockAllChildFields,
          newFieldName: [
            'test'
          ]
        });
      });
    });

    it('should add a new field (as an object with value) to the fields object', () => {
      const mockFieldId = 'newFieldName.websiteUrl';
      const mockFieldValue = 'testing.com';
      const mockAllChildFields = {
        test: true
      };
      const result = handleChildField(
        mockFieldId,
        mockFieldValue,
        mockAllChildFields
      );

      expect(result).to.deep.eq({
        ...mockAllChildFields,
        newFieldName: {
          websiteUrl: mockFieldValue
        }
      });
    });

  });

  describe('handleFormData', () => {

    beforeEach(() => {
      const FormDataMock = fields => {
        return {
          entries: () => [
            ...fields
          ]
        }
      };

      global.FormData = jest.fn((data) => FormDataMock(data));
    });

    it('should return a postData object', () => {
      const mockFields = [
        ['fieldA', 'testValue'],
        ['fieldB', 'test']
      ];
      const result = handleFormData(mockFields);

      expect(result).to.deep.eq({
        fieldA: 'testValue',
        fieldB: 'test'
      });
    });

    describe('when formData contains child fields', () => {
      it('should return a postData object with the given child fields', () => {
        const mockFields = [
          ['fieldA.website', 'mywebsite.com'],
          ['fieldA.twitter', 'twitter.com'],
          ['fieldB', 'test'],
          ['fieldC.0', 'random string'],
          ['fieldC.1', 'random string 2'],
        ];
        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          fieldA: {
            website: 'mywebsite.com',
            twitter: 'twitter.com',
          },
          fieldB: 'test',
          fieldC: [
            'random string',
            'random string 2'
          ]
        });
      });
    });

  });

});
