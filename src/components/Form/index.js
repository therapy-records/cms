import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import FormField from '../FormField';
import { handleFormData } from '../../utils/graphql-form';
import { isEmptyString } from '../../utils/strings';
import Sticky from '../Sticky/Sticky';
import LoadingSpinner from '../LoadingSpinner';

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
        variables: { input: postData }
      }).then(
        result => {
          console.log('*** success');
        },
        (errors) => {
          // removing this causes issues in unit test
        }
      )
    } else {
      console.log('form not valid, not submitting')
    }
  }

  const submitButtonCopy = isEditForm ? 'Update' : 'Add';

  return (
    <div>

      <LoadingSpinner
        active={loading}
        fullScreen
      />

      {!loading && (
        <div>
        
          {error && (
            <Sticky>
              <p>Form is invalid</p>
            </Sticky>
          )}

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
                disabled={!isValid}
              >{submitButtonCopy}
              </button>
              {loading && <p>loading</p>}
            </div>

          </form>
        </div>
      )}

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
