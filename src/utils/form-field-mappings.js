import { objectHasValues } from './objects';

export const isFieldArray = fieldType => fieldType.includes('arrayOf');

export const isFieldArrayWithValues = (fieldId, valuesObj) =>
  valuesObj[fieldId] &&
  (objectHasValues(valuesObj[fieldId]) ||
    valuesObj[fieldId].length > 0);

export const mapFieldArrayOfObjectsWithValues = (field, valuesObj) => {
  const fieldId = field.id;

  Object.keys(valuesObj[fieldId]).forEach(key => {
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
    if (field.component === 'ImageUpload') {
      field.value = valuesObj[field.id];
    } else if (field.type === 'arrayOfObjects') {
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

// for some reason, when creating multiple press articles
// when <Form /> is rendered again, it can render old values.
// this mapping works around this issue.
// not a great solution as it doesn't fix the root cause.
export const mapFields = fields =>
  fields.map(f => ({
    ...f,
    value: ''
  }));

export default mapFieldsWithValues;
