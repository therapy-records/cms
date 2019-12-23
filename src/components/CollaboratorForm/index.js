import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../FormElements/TextInput';

export const CollaboratorForm = props => {
  const {
    isEditForm
  } = props;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // const form = ev.target;
    // const data = new FormData(form);
  }

  const submitButtonCopy = isEditForm ? 'Update Collaborator' : 'Add Collaborator';

  return (
      <form onSubmit={handleSubmit} encType='multipart/form-data'>

        <div className='row-large'>
          <TextInput
            type='text'
            placeholder='Phil Collins'
            label='Name'
            name='name'
            required
          />
        </div>

        <div className='row-large'>
          <TextInput
            type='text'
            placeholder='Lorem ipsum...'
            label='About'
            name='about'
            required
          />
        </div>

        <div className='row-large'>
          <p>Avatar here...</p>
        </div>

        <div className='row-large'>
          <p>CollabOn here...</p>
        </div>

        <div className='row-large'>
          <p>URLs here...</p>
        </div>

        <div className='row-large'>
          <button type='submit'
            className='btn-lg btn-submit'
          >{submitButtonCopy}
          </button>
        </div>
      
      </form>
  );
};

CollaboratorForm.propTypes = {
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  isEditForm: false
};

export default CollaboratorForm;

