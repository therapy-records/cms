import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import PressForm from '../../../components/PressForm';

const PressCreate = () => (
  <article className='container'>

    <div className='heading-with-btns'>
      <h2>Create Press 📢</h2>
    </div>

    <div className='col-clear' />

    <PressForm
      fields={new FormFields().press}
      mutation={CREATE_PRESS}
      refetchQueries={[
        { query: GET_PRESS }
      ]}
    />

  </article>
);

export default PressCreate;

