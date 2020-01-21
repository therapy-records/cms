import {
  isChildField,
  getChildFieldIds,
  formatChildField,
  handleChildFieldArray,
  handleChildField
} from './form-field-child-handler';

describe('(Utils) form-field-child-handler', () => {

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

});
