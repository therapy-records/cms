import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { handleFormData } from '../../utils/graphql-form';

const Form = ({
  children,
  mutation,
  isEditForm
}) => {

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

        {children}

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
  children: PropTypes.node.isRequired,
  mutation: PropTypes.object.isRequired,
  isEditForm: PropTypes.bool
};

Form.defaultProps = {
  isEditForm: false
};

export default Form;
