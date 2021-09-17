import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_PRESS,
  GET_PRESS_ARTICLE
} from '../../../queries';
import { DELETE_PRESS } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';

const PressView = ({
  match
}) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/press'
      entityName='pressArticle'
      entityCollection='press'
      id={id}
      query={GET_PRESS_ARTICLE}
      render={entityData => (
        <div className='entity-container'>

          <div className='flex-root'>

            <div className='entity-image-container'>
              <img
                src={entityData.image.cloudinaryUrl}
                alt={entityData.title}
              />
            </div>

            <div>
              <h4>Excerpt</h4>
              <p>{entityData.excerpt}</p>

              <h4>URL</h4>
              <p><a href={entityData.externalLink} target='_blank' rel='noopener noreferrer'>{entityData.externalLink}</a></p>
            </div>

          </div>
        </div>
      )}

      mutation={DELETE_PRESS}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Press'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_PRESS,
        responseObjName: 'deletePress'
      }}
    />
  );
};

PressView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default PressView;
