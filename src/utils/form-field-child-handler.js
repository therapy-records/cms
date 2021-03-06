import {
  containsNumber,
  isAString
} from './strings';

export const isChildField = fieldId => {
  if (fieldId.includes('.')) {
    return true;
  }
  return false;
};

export const getChildFieldIds = fieldId => {
  const index = fieldId.indexOf('.');
  const childFieldId = fieldId.substring(0, index);
  const grandChildFieldId = fieldId.substring(index + 1);

  if (containsNumber(grandChildFieldId)) {
    return {
      childFieldId
    }
  }

  return {
    childFieldId,
    grandChildFieldId
  }
};

export const formatChildField = (fieldId, fieldValue) => {
  const { grandChildFieldId } = getChildFieldIds(fieldId);

  if (grandChildFieldId) {
    return {
      [grandChildFieldId]: fieldValue
    }
  }
  return fieldValue;
};

// TODO: simplify/change naming conventions

export const handleChildFieldArray = (allChildFields, fieldValue, childFieldId) => {
  if (allChildFields[childFieldId]) {
    allChildFields[childFieldId] = [
      ...allChildFields[childFieldId],
      fieldValue
    ]
  } else {
    allChildFields = {
      ...allChildFields,
      [childFieldId]: [
        fieldValue
      ]
    }
  }
  return allChildFields;
};

export const handleChildField = (fieldId, fieldValue, allChildFields) => {
  const { childFieldId } = getChildFieldIds(fieldId);
  const formattedChildField = formatChildField(fieldId, fieldValue);

  if (isAString(formattedChildField)) {
    allChildFields = handleChildFieldArray(allChildFields, fieldValue, childFieldId);
  } else {
    allChildFields[childFieldId] = {
      ...allChildFields[childFieldId],
      ...formattedChildField
    };
  }
  return allChildFields;
};
