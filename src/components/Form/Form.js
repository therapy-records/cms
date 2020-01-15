import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import formReducer, { initReducerState } from './reducer';
import FormField from '../FormElements/FormField';
import { handleFormData } from '../../utils/graphql-form';
import StickyNew from '../StickyNew';
import LoadingSpinner from '../LoadingSpinner';
import FormSuccess from '../FormElements/FormSuccess';

const Form = ({
  mutation,
  fields,
  mutateId,
  baseUrl,
  successCopy,
  refetchQueries,
  isEditForm
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
  ] = useMutation(mutation, {
    refetchQueries
  });

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
          baseUrl={baseUrl}
          successCopy={successCopy}
          onReset={() => dispatch({ type: 'resetForm' })}
        />
      )}

    </div>
  )
};

Form.propTypes = {
  mutation: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
  successCopy: PropTypes.shape({
    homeLink: PropTypes.string.isRequired,
    createLink: PropTypes.string
  }),
  mutateId: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  isEditForm: PropTypes.bool
};

Form.defaultProps = {
  mutateId: null,
  refetchQueries: [],
  isEditForm: false
};

export default Form;
