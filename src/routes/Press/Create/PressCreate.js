import React from 'react'; // React 
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import PressForm from '../../../components/PressForm';
import { mapFields } from '../../../utils/form-field-mappings';

const PressCreate = () => {
  return (
    <article className='container'>

      <PageHeader heading='Create Press 📢' />

      <div className='col-clear' />

      <PressForm
        fields={mapFields(new FormFields().press)}
        mutation={CREATE_PRESS}
        refetchQueries={[
          { query: GET_PRESS }
        ]}
      />

    </article>
  );
}

export default PressCreate;

