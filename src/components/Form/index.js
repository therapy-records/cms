import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import FormField from '../FormField';
import { handleFormData } from '../../utils/graphql-form';
import { isEmptyString } from '../../utils/strings';
// import { arrayOfObjectsHasValues } from '../../utils/arrays';

// export const arrayOfObjectsHasValues = (arr = []) => {
//   console.log('******************************************UTIL ARRAY: ', arr);
//   // console.log('--------- UTIL arrayOfObjectsHasValues INIT ARRAY ', arr);
//   const itemsWithValues = [];
//   arr.map(i => {
//     // (i.value &&
//     // !isEmptyString(i.value)));
//     if (i.value) {

//       if (i.value.length > 0) {
//         console.log(`UTIL pushinng, ${i.value} is NOT an empty string`)
//         itemsWithValues.push(i);
//       } else {
//         console.log(`UTIL not pushinng. ${i.value} is empty string`);
//       }
//     }
//     // return null;
//   });
//   console.log('UTIL itemsWithValues ', itemsWithValues);
//   // console.log('--------- UTIL arrayOfObjectsHasValues arr ', itemsWithValues);
//   // console.log('--------- UTIL arrayOfObjectsHasValues arr length ', itemsWithValues.length);
//   if (itemsWithValues.length >= 1) {
//     return true;
//   }
//   return false;
// };


function init(initFields) {
  return {
    fields: initFields,
    isValid: false
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateFieldValue': {
      const { id, value } = action.payload;

      const updatedFields = state.fields;
      const formField = updatedFields.find(f => f.id === id);
      formField.value = value;
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

    default:
      throw new Error();
  }
}

const Form = ({
  mutation,
  fields,
  isEditForm
}) => {

  const [state, dispatch] = useReducer(
    reducer,
    fields,
    init
  );

  const { isValid } = state;

  const [
    postForm,
    {
      loading,
      error
    }
  ] = useMutation(mutation);

  const handleFieldValueChange = (fieldId, value) => {
    dispatch({
      type: 'updateFieldValue',
      payload: {
        id: fieldId,
        value
      }
    });
    dispatch({ type: 'isFormValid' });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const postData = handleFormData(form);
    postData.avatarUrl = 'https://via.placeholder.com/250'; // TEMP

    dispatch({ type: 'isFormValid' });

    if (state.isValid) {
      postForm({
        variables: { input: postData },
        errorPolicy: 'all'
      }).then(
        result => {
          console.log('*** success');
        },
        (errors) => {
          console.log('*** errors ', errors);
        }
      )
    } else {
      console.log('form not valid, not submitting')
    }
  }

  const submitButtonCopy = isEditForm ? 'Update' : 'Add';

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: '0',
        background: '#EEE',
        color: '#000',
        padding: '1em',
        width: '100%',
        zIndex: '9999'
      }}>
        {loading && <p>loading</p>}
        {error && error.message && error.message && <p>error! {error.message}</p>}
      </div>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>

        {state.fields.map((field) => (
          <div key={field.id} className='row-large'>
            <FormField
              {...field}
              onChange={(value) => handleFieldValueChange(field.id, value)}
            />
          </div>
        ))}

        <div className='row-large'>
          <button
            type='submit'
            className='btn-lg btn-submit'
            disabled={isValid}
          >{submitButtonCopy}
          </button>
        </div>

      </form>
    </div>
  )
};

Form.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditForm: PropTypes.bool
};

Form.defaultProps = {
  isEditForm: false
};

export default Form;
