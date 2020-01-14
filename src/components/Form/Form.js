import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import formReducer, { initReducerState } from './reducer';
import FormField from '../FormField';
import { handleFormData } from '../../utils/graphql-form';
import StickyNew from '../StickyNew';
import LoadingSpinner from '../LoadingSpinner';
import FormSuccess from '../FormSuccess';

const Form = ({
  mutation,
  fields,
  isEditForm,
  mutateId
}) => {

  const [state, dispatch] = useReducer(
    formReducer,
    fields,
    initReducerState
  );

  const { isValid, submitSuccess } = state;

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

    dispatch({ type: 'isFormValid' });

    if (state.isValid) {
      const variablesObj = {
        input: postData
      };
      if (mutateId) {
        variablesObj.id = mutateId;
      }

      postForm({
        variables: variablesObj
      }).then(
        result => {
          dispatch({ type: 'submitSuccess' });
        },
        (errors) => {
          // removing this causes issues in unit test
        }
      )
    } else {
      console.log('form not valid, not submitting')
    }
  };

  const submitButtonCopy = isEditForm ? 'Update' : 'Add';
  const showForm = !loading && !submitSuccess;

  return (
    <div>

      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {showForm && (
        <div>

          {error && (
            <StickyNew>
              <p>Sorry, something has gone wrong.</p>
            </StickyNew>
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
              <input
                type='submit'
                className='btn-lg'
                disabled={!isValid}
                value={submitButtonCopy}
              />
            </div>

          </form>
        </div>
      )}

      {submitSuccess && (
        <FormSuccess
          title='Collaborators'
          createCopy='Create another Collaborator'
          onReset={() => dispatch({ type: 'resetForm' })}
        />
      )}

    </div>
  )
};

Form.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditForm: PropTypes.bool,
  mutateId: PropTypes.string
};

Form.defaultProps = {
  isEditForm: false,
  mutateId: null
};

export default Form;
