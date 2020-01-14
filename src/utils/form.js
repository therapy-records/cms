import { objectHasValues } from './objects';

export const required = value => value ? undefined : 'required';

export const isFieldArray = fieldType => fieldType.includes('arrayOf');

export const isFieldArrayWithValues = (fieldId, valuesObj) =>
  valuesObj[fieldId] && 
  (objectHasValues(valuesObj[fieldId]) ||
  valuesObj[fieldId].length > 0);

export const mapFieldArrayOfObjectsWithValues = (field, valuesObj) => {
  const fieldId = field.id;

  Object.keys(valuesObj[fieldId]).forEach(key => {

    // TODO: 'other' needs alignment with API/model/UI
    if (key === 'other') return null;

    const valueExists = valuesObj[fieldId][key];
    if (valueExists) {
      const childField = field.items.find(child => child.id === key);
      childField.value = valuesObj[fieldId][key];
    }
  });
  return field;
};

export const mapFieldArrayOfStringsWithValues = (field, valuesObj) => {
  let itemsArrayOfStrings = [];
  valuesObj[field.id].forEach(str => {
    itemsArrayOfStrings = [
      ...itemsArrayOfStrings,
      { value: str }
    ]
  });
  field.items = itemsArrayOfStrings;
  return field;
};

export const mapFieldArray = (field, valuesObj) => {
  if (isFieldArrayWithValues(field.id, valuesObj)) {

    if (field.type === 'arrayOfObjects') {
      field = mapFieldArrayOfObjectsWithValues(
        field,
        valuesObj
      );
    } else {
      field = mapFieldArrayOfStringsWithValues(
        field,
        valuesObj
      );
    }
  }
  return field;
};

export const mapFieldsWithValues = (fields, valuesObj) =>
  fields.map(field => {
    const fieldId = field.id;

    if (isFieldArray(field.type)) {
      field = mapFieldArray(field, valuesObj);
    } else {
      const value = valuesObj[fieldId];
      if (value) {
        field.value = value;
      }
    }
    return field;
  });
