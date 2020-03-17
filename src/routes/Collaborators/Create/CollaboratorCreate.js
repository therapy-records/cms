import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_COLLABORATOR } from '../../../mutations';
import { GET_COLLABORATORS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import CollaboratorForm from '../../../components/CollaboratorForm';
import { mapFields } from '../../../utils/form-field-mappings';

const CollaboratorCreate = () => (
  <article className='container'>

    <PageHeader heading='Add Collaborator 🌈' />

    <div className='col-clear' />

    <CollaboratorForm
      fields={mapFields(new FormFields().collaborator)}
      mutation={CREATE_COLLABORATOR}
      refetchQueries={[
        { query: GET_COLLABORATORS }
      ]}
      baseUrl='/collaborators'
    />

  </article>
);

export default CollaboratorCreate;

