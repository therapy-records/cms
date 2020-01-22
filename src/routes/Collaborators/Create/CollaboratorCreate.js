import React from 'react';
import Form from '../../../components/Form';
import COLLABORATOR_FIELDS from '../../../formFields/collaborator';
import { CREATE_COLLABORATOR } from '../../../mutations';
import { GET_COLLABORATORS } from '../../../queries';

const CollaboratorCreate = () => (
  <article className='container'>

    <div className='heading-with-btns'>
      <h2>Add Collaborator 🌈</h2>
    </div>

    <div className='col-clear' />

    <Form
      mutation={CREATE_COLLABORATOR}
      refetchQueries={[
        { query: GET_COLLABORATORS }
      ]}
      fields={COLLABORATOR_FIELDS}
      baseUrl='/collaborators'
      successCopy={{
        homeLink: 'Go to Collaborators',
        createLink: 'Create another Collaborator'
      }}
    />

  </article>
);

export default CollaboratorCreate;

