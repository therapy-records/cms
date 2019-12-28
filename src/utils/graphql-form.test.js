import {
  isChildField,
  getChildFieldIds,
  formatChildField
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
      it('should return an array with just the field value', () => {
        const mockFieldId = 'myFieldArray.0';
        const mockFieldValue = 'testing';
        const result = formatChildField(mockFieldId, mockFieldValue);

        expect(result).to.deep.eq([
          mockFieldValue
        ]);
      });
    });

  });

});
