import {
  isChildField,
  handleChildField
} from './form-field-child-handler';

// NOTE: remove in future, this is only used for redux-form fields.
export const required = value => value ? undefined : 'required';

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
