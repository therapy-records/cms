import {
  containsNumber,
  isEmptyString
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
}

export const formatChildField = (fieldId, fieldValue) => {
  const { grandChildFieldId } = getChildFieldIds(fieldId);

  if (grandChildFieldId) {
    return {
      [grandChildFieldId]: fieldValue
    }
  }
  return [
    fieldValue
  ];
};

export const handleChildField = (fieldId, fieldValue, childFields) => {
  const { childFieldId } = getChildFieldIds(fieldId);
  const formattedChildField = formatChildField(fieldId, fieldValue);

  if (Array.isArray(formattedChildField)) {
    if (isEmptyString(formattedChildField[0])) {
      return childFields;
    }

    if (childFields[childFieldId]) {
      childFields[childFieldId] = [
        ...childFields[childFieldId],
        ...formattedChildField
      ]
    } else {
      childFields = {
        ...childFields,
        [childFieldId]: [
          ...formattedChildField
        ]
      }
    }
  } else {
    childFields[childFieldId] = {
      ...childFields[childFieldId],
      ...formattedChildField
    };
  }
  return childFields;
}

export const handleFormData = form => {
  const data = new FormData(form);
  let postData = {};
  let fieldsWithChildren = {};

  for (const pair of data.entries()) {
    let fieldId = pair[0];
    const fieldValue = pair[1];

    // TODOD: maybe this can be simplified along with handleChildField?
    if (isChildField(fieldId)) {
      fieldsWithChildren = handleChildField(
        fieldId,
        fieldValue,
        fieldsWithChildren
      );
    } else {
      postData = {
        ...postData,
        [fieldId]: fieldValue
      }
    }

    postData = {
      ...postData,
      ...fieldsWithChildren
    }
  }
  return postData;
};
