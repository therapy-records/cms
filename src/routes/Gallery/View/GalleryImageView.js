import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GALLERY_IMAGE_WITH_COLLAB_NAMES,
  GET_GALLERY
} from '../../../queries';
import { DELETE_GALLERY_IMAGE } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import GalleryImageDetails from '../../../components/GalleryImageDetails/GalleryImageDetails';

const GalleryImageView = ({
  match
}) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/gallery'
      entityName='galleryImageWithCollaboratorNames'
      entityCollection='gallery'
      id={id}
      query={GET_GALLERY_IMAGE_WITH_COLLAB_NAMES}
      mutation={DELETE_GALLERY_IMAGE}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Gallery'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_GALLERY,
        responseObjName: 'deleteGalleryImage'
      }}
      render={entityData => (
        <GalleryImageDetails {...entityData} />
      )}
    />
  );
};

GalleryImageView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default GalleryImageView;
