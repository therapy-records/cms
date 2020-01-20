import { isEmptyString } from '../../utils/strings';

export function initReducerState(initFields) {
  return {
    fields: initFields,
    isValid: false,
    submitSuccess: false
  };
}


function reducer(state, action) {
  switch (action.type) {
    case 'updateFieldValue': {
      const { id, value } = action.payload;
      const updatedFields = state.fields;
      const formField = updatedFields.find(f => f.id === id);
      
      formField.value = value.toString();

      if (formField.value) {
        formField.dirty = true;
      }
      if (!formField.touched) {
        formField.touched = true;
      }

      return {
        fields: updatedFields
      }
    }

    case 'isFormValid': {
      const requiredFields = state.fields.filter(f => f.required);
      const invalidRequiredFields = fields => fields.filter(f => (
        !f.value ||
        isEmptyString(f.value)
      ));
      const totalInvalidRequiredFields = invalidRequiredFields(requiredFields).length;

      const updatedFields = state.fields;
      updatedFields.map(formField => {
        if (formField.required &&
          (!formField.value || isEmptyString(formField.value))) {
          formField.error = 'This field is required';
        } else {
          formField.error = null;
        }
      });

      return {
        fields: updatedFields,
        isValid: totalInvalidRequiredFields === 0
      }
    }

    case 'submitSuccess': {
      return {
        ...state,
        submitSuccess: true
      }
    }

    case 'resetForm': {
      const updatedFields = state.fields;
      updatedFields.map(formField => {
        if (formField.items) {
          formField.items.map(item => {
            item.value = '';
          });
        }
        if (formField.value) {
          formField.value = '';
        }
      });

      return {
        ...state,
        fields: updatedFields,
        isValid: false,
        submitSuccess: false
      }
    }

    default:
      return state;
  }
}

export default reducer;
