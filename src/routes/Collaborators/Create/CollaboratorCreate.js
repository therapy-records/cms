import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_COLLABORATOR } from '../../../mutations';
import { GET_COLLABORATORS } from '../../../queries';
import CollaboratorForm from '../../../components/CollaboratorForm';

const CollaboratorCreate = () => (
  <article className='container'>

    <div className='heading-with-btns'>
      <h2>Add Collaborator 🌈</h2>
    </div>

    <div className='col-clear' />

    <CollaboratorForm
      fields={new FormFields().collaborator}
      mutation={CREATE_COLLABORATOR}
      refetchQueries={[
        { query: GET_COLLABORATORS }
      ]}
      baseUrl='/collaborators'
    />

  </article>
);

export default CollaboratorCreate;

