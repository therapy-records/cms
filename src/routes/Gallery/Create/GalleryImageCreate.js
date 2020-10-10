import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_GALLERY_IMAGE } from '../../../mutations';
import { GET_GALLERY } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import GalleryForm from '../../../components/GalleryForm';
import { mapFields } from '../../../utils/form-field-mappings';

const GalleryImageCreate = () => (
  <article className='container'>

    <PageHeader heading='Upload Gallery Images 🌻' />

    <div className='col-clear' />

    <GalleryForm
      fields={mapFields(new FormFields().gallery)}
      mutation={CREATE_GALLERY_IMAGE}
      refetchQueries={[
        { query: GET_GALLERY }
      ]}
      baseUrl='/gallery'
    />

  </article>
);

export default GalleryImageCreate;
