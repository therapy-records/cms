import React from 'react';
import FormFields from '../../../formFields';
import { CREATE_GALLERY_IMAGE } from '../../../mutations';
import {
  GET_COLLABORATORS_NAMES,
  GET_GALLERY
} from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import QueryContainer from '../../../containers/QueryContainer';
import GalleryForm from '../../../components/GalleryForm';
import { mapFields } from '../../../utils/form-field-mappings';

const GalleryImageCreate = () => (
  <article className='container'>

    <QueryContainer
      query={GET_COLLABORATORS_NAMES}
      entityName='collaborators'
      render={queryData => {
        const allCollaborators = queryData;

        return (
          <div>

            <PageHeader heading='Upload Gallery Images 🌻' />

            <div className='col-clear' />

            {/*
              TODO: map collabs into Gallery form field.
            */}

            <ul>
              {allCollaborators.map((collaborator) => (
                <li key={collaborator._id}>{collaborator.name}</li>
              ))}
            </ul>
            <br />
            <br />
            <br />

            <GalleryForm
              fields={mapFields(new FormFields().gallery)}
              mutation={CREATE_GALLERY_IMAGE}
              refetchQueries={[
                { query: GET_GALLERY }
              ]}
              baseUrl='/gallery'
            />

          </div>
        )
      }}
    />
  </article>
);

export default GalleryImageCreate;