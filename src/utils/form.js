import {
  isChildField,
  handleChildField
} from './form-field-child-handler';
import {
  isAnObject,
  objectHasValues
} from '../utils/objects';

// NOTE: remove in future, this is only used for redux-form fields.
export const required = value => {
  if ((!isAnObject(value) && value)
    || (isAnObject(value) && objectHasValues(value))) {
    return undefined;
  }
  return 'required';
};

const isAvatarField = (fieldId) => fieldId === 'avatar';

const isSingleImage = (fieldId) => isAvatarField(fieldId);

const handleFormData = form => {
  const data = new FormData(form);
  let postData = {};
  let fieldsWithChildren = {};

  for (const pair of data.entries()) {
    const fieldId = pair[0];
    const fieldValue = pair[1];

    if (isChildField(fieldId)) {
      fieldsWithChildren = handleChildField(
        fieldId,
        fieldValue,
        fieldsWithChildren
      );
    } else if (isSingleImage(fieldId)) {
      postData = {
        ...postData,
        [fieldId]: {
          ...fieldValue[0]
        }
      }
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

export default handleFormData;
