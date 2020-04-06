import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import formReducer, { initReducerState } from './reducer';
import FormField from '../FormElements/FormField';
import handleFormData from '../../utils/form';
import StickyError from '../StickyError';
import LoadingSpinner from '../LoadingSpinner';
import SuccessMessage from '../FormElements/SuccessMessage';

const Form = ({
  mutation,
  fields,
  mutateId,
  baseUrl,
  submitButtonCopy,
  successCopy,
  refetchQueries
}) => {
  const [ state, dispatch ] = useReducer(
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

  useEffect(() => {
    return () => {
      dispatch({ type: 'resetForm' });
    };
  }, []);

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
    }
  };

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
            <StickyError
              message='Sorry, something has gone wrong.'
              error={error}
            />
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
        <SuccessMessage
          baseUrl={baseUrl}
          copy={successCopy}
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
  submitButtonCopy: PropTypes.string.isRequired,
  successCopy: PropTypes.shape({
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }).isRequired,
  mutateId: PropTypes.string,
  refetchQueries: PropTypes.arrayOf(PropTypes.object)
};

Form.defaultProps = {
  mutateId: null,
  refetchQueries: []
};

export default Form;
