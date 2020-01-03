// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { handleFormData } from '../../utils/graphql-form';
import FormField from '../FormField';

/*
for each form field...
on change.. dispatch in <Form />, updates value in reducer
*/

// function init(initFormValues) {
//   return { formValues: initFormValues };
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'updateFormValue': {
//       const {
//         id,
//         value
//       } = action.payload;

//       const formField = state.formValues.find(f => f.id === id);
//       formField.value = value;
//       return {
//         formValues: [
//           ...state.formValues,
//           formField
//         ]
//       }
//     }

//     default:
//       throw new Error();
//   }
// }

const Form = ({
  mutation,
  fields,
  isEditForm
}) => {

  // const [ submitDisabled, setSubmitDisabled ] = useState(true);
  // const [ submitDisabled ] = useState(true);
  // const [ formValues, setFormV ] = useState(true);

  // use reducer
  // const [state, dispatch] = useReducer(reducer, formFields, init);

  const [
    postForm,
    {
      loading,
      error
    }
  ] = useMutation(mutation);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const postData = handleFormData(form);
    postData.avatarUrl = 'https://via.placeholder.com/250'; // TEMP

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

        {/* children */}

        {fields.map((field) => (
          <div
            key={field.id}
            className='row-large'
          >
            <FormField {...field} />
          </div>
        ))}

        <div className='row-large'>
          <button
            type='submit'
            className='btn-lg btn-submit'
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
