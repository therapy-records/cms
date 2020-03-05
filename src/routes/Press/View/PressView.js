import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_PRESS,
  GET_PRESS_ARTICLE
} from '../../../queries';
import { DELETE_PRESS_ARTICLE } from '../../../mutations';
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
      render={entityData => (
        <div>
          <p>author: {entityData.author}</p>
          <p>copy: {entityData.copy}</p>
          <p>link: {entityData.externalLink}</p>
          <p>createdAt: {entityData.createdAt}</p>
        </div>
      )}
      query={GET_PRESS_ARTICLE}
      mutation={DELETE_PRESS_ARTICLE}
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
