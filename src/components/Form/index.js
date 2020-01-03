import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import FormField from '../FormField';
import { handleFormData } from '../../utils/graphql-form';
import { isEmptyString } from '../../utils/strings';

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

      return {
        ...state,
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

  const handleFieldError = field => {
    const { required, value } = field;

    if (required &&
        (!value ||
        isEmptyString(value))) {
      return 'This field is required';
    }
  }

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

        {state.fields.map((field) => (
          <div key={field.id} className='row-large'>
            <FormField
              {...field}
              onChange={(value) => handleFieldValueChange(field.id, value)}
              error={handleFieldError(field)}
            />
          </div>
        ))}

        <div className='row-large'>
          <button
            type='submit'
            className='btn-lg btn-submit'
            disabled={!isValid}
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
