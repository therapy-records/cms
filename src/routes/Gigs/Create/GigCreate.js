import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_GIG } from '../../../mutations';
import { GET_GIG } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
// import PressForm from '../../../components/PressForm';
import GigForm from '../../../components/GigForm/GigForm';
import { mapFields } from '../../../utils/form-field-mappings';

const GigCreate = () => {
  return (
    <article className='container'>

      <PageHeader heading='Create Gig 🗓️' />

      <div className='col-clear' />

      <GigForm
        fields={mapFields(new FormFields().gig)}
        mutation={CREATE_GIG}
        refetchQueries={[
          { query: GET_GIG }
        ]}
      />

    </article>
  );
}

export default GigCreate;

