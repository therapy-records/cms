import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';

export const CollaboratorForm = props => {
  const {
    isEditForm
  } = props;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // const form = ev.target;
    // const data = new FormData(form);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log('data name ', data.get('name'));
    // console.log('data about ', data.get('about'));
    // console.log('data collabOn ', data.get('collabOn'));
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
          <TextInputsList
            label="Collaborated on"
            items={['', '']}
            name='collabOn'
          />
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

