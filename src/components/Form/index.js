import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { handleFormData } from '../../utils/graphql-form';

const Form = ({
  children,
  mutation,
  isEditForm
}) => {
  const [postForm] = useMutation(mutation);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const postData = handleFormData(form);
    postData.avatarUrl = 'https://via.placeholder.com/250'; // TEMP

    console.log('post data \n', postData);
    postForm({
      variables: { input: postData }
    });
  }

  const submitButtonCopy = isEditForm ? 'Update' : 'Add';

  return (
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
