import React from 'react';
import PropTypes from 'prop-types';
import { CREATE_COLLABORATOR } from '../../mutations';
import COLLABORATOR_FIELDS from './fields';
import Form from '../Form';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';
import DropzoneImageUpload from '../DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';

export const AVATAR_MINIMUM_DIMENSIONS = {
  width: 111,
  height: 111
};

export const CollaboratorForm = ({ isEditForm }) => (
  <Form
    mutation={CREATE_COLLABORATOR}
    isEditForm={isEditForm}
  >
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
        placeholder='e.g Saxophonist'
        label='Role'
        name='role'
        required
      />
    </div>

    <div className='row-large'>
      <RichTextEditor
        title='About'
        name='about'
        showSingleHiddenInputValue
      />
    </div>

    <div className='row-large'>
      <DropzoneImageUpload
        title="Avatar"
        component={DropzoneImageUpload}
        minImageDimensions={AVATAR_MINIMUM_DIMENSIONS}
        inputProps={{
          name: 'avatarUrl'
        }}
        showSingleHiddenInputValue
        multiple={false}
        ctaCopy='Drag & drop image'
      />
    </div>

    <div className='row-large'>
      <TextInputsList
        fieldsetLegend="Collaborated on"
        items={COLLABORATOR_FIELDS.collabOn}
        name='collabOn'
        showAddRemove
      />
    </div>

    <div className='row-large'>
      <TextInputsList
        heading="URLs"
        items={COLLABORATOR_FIELDS.urls}
        name='urls'
      />

    </div>

  </Form>
);

CollaboratorForm.propTypes = {
  isEditForm: PropTypes.bool
};

CollaboratorForm.defaultProps = {
  isEditForm: false
};

export default CollaboratorForm;

