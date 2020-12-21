import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GALLERY_IMAGE_WITH_ALL_COLLABORATORS,
  GET_GALLERY
} from '../../../queries';
import {
  EDIT_GALLERY_IMAGE,
  DELETE_GALLERY_IMAGE
} from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import GalleryForm from '../../../components/GalleryForm';
import mapFieldsWithValues from '../../../utils/form-field-mappings';
import FormFields from '../../../formFields';

const GalleryImageEdit = ({ match }) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/gallery'
      entityName='galleryImageWithAllCollaborators'
      entityCollection='gallery'
      id={id}
      query={GET_GALLERY_IMAGE_WITH_ALL_COLLABORATORS}
      isEdit
      render={entityData => (
        <GalleryForm
          fields={mapFieldsWithValues(
            new FormFields(entityData).galleryEdit,
            entityData
          )}
          mutation={EDIT_GALLERY_IMAGE}
          id={id}
          refetchQueries={[
            { query: GET_GALLERY }
          ]}
          isEdit
        />
      )}
      mutation={DELETE_GALLERY_IMAGE}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Gallery'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_GALLERY,
        responseObjName: 'deleteGalleryImage'
      }}
    />
  );
};

GalleryImageEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default GalleryImageEdit;
