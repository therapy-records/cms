import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GIG,
  GET_GIGS
} from '../../../queries';
import { DELETE_GIG } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';

const GigsView = ({
  match
}) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/gigs'
      entityName='gig'
      entityCollection='gigs'
      id={id}
      query={GET_GIG}
      render={entityData => (
          <div>
          {console.log(entityData)}
          <h4>Excerpt</h4>
          <p>{entityData.title}</p>
          <p>{entityData.location}</p>
          <p>{entityData.venue}</p>
          <p>{entityData.date}</p>

          <h4>URL</h4>
          <p><a href={entityData.externalLink} target='_blank'>{entityData.externalLink}</a></p>
        </div>
      )}
      mutation={DELETE_GIG}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Gigs'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_GIGS,
        responseObjName: 'deleteGigs'
      }}
    />
  );
};

GigsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default GigsView;
