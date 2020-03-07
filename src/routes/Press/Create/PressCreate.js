import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import Form from '../../../components/Form';

const CollaboratorCreate = () => (
  <article className='container'>

    <div className='heading-with-btns'>
      <h2>Create Press 📢</h2>
    </div>

    <div className='col-clear' />

    <Form
      mutation={CREATE_PRESS}
      fields={new FormFields().press}
      refetchQueries={[
        { query: GET_PRESS }
      ]}
      baseUrl='/press'
      submitButtonCopy='Add Press'
      successCopy={{
        success: 'Successfully created!',
        homeLink: 'Go to Press',
        createLink: 'Create another Press article'
      }}
    />

  </article>
);

export default CollaboratorCreate;

