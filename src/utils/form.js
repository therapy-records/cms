import { objectHasValues } from './objects';

export const required = value => value ? undefined : 'required';

export const isFieldArray = fieldType => fieldType.includes('arrayOf');

export const isFieldArrayWithValuesToMap = (field, valuesObj) =>
  isFieldArray(field.type) &&
  (objectHasValues(valuesObj[field.id]) ||
  valuesObj[field.id].length > 0);

export const mapFieldsWithValues = (fields, valuesObj) =>
  fields.map(field => {
    const fieldId = field.id;
    const fieldType = field.type;

    if (isFieldArrayWithValuesToMap(field, valuesObj)) {

      if (fieldType === 'arrayOfObjects') {
        Object.keys(valuesObj[fieldId]).forEach(key => {

          // TODO: 'other' needs alignment with API/model/UI
          if (key === 'other') return null;

          const valueExists = valuesObj[fieldId][key];
          if (valueExists) {
            const childField = field.items.find(child => child.id === key);
            childField.value = valuesObj[fieldId][key];
          }
        });
      } else {
        let itemsArrayOfStrings = [];
        valuesObj[fieldId].forEach(str => {
          itemsArrayOfStrings = [
            ...itemsArrayOfStrings,
            { value: str }
          ]
        });
        field.items = itemsArrayOfStrings;
      }
      
    } else {
      const value = valuesObj[fieldId];
      if (value) {
        field.value = value;
      }
    }
    return field;
  });
  
