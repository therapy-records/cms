import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GALLERY_IMAGE
  // GET_GALLERY
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
      entityName='galleryImage'
      entityCollection='gallery'
      id={id}
      query={GET_GALLERY_IMAGE}
      mutation={DELETE_GALLERY_IMAGE}
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
