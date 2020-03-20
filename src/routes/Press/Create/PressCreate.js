import React from 'react'; // React 
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations'; // query 
import { GET_PRESS } from '../../../queries'; // query 
import PressForm from '../../../components/PressForm';
import { mapFields } from '../../../utils/form-field-mappings';

const PressCreate = () => {
  return (
    <article className='container'>

      <div className='heading-with-btns'>
        <h2>Create Press 📢</h2>
      </div>

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

