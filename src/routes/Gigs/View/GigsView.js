import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GIG,
  GET_GIGS
} from '../../../queries';
import { DELETE_GIG } from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import moment from 'moment';

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
      mutation={DELETE_GIG}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Gigs'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_GIGS,
        responseObjName: 'deleteGig'
      }}
      render={entityData => (
        <div className="list-item-row no-border">
            {entityData.date &&
                <div className='img-container'>
                    <div className="date">
                        <p>{moment(new Date(entityData.date)).format('ddd')}</p>
                        <p>{moment(new Date(entityData.date)).format('DD')}</p>
                        <p>{moment(new Date(entityData.date)).format('MMM')}</p>
                    </div>
                </div>
            }

            <div className='content-container'>
                <div className='content'>
                    <div>
                        <div className='small-tabs-container inline-sty' >
                            {(entityData.venue && entityData.location && entityData.date) && <p>{entityData.venue}, {entityData.location}, {moment(new Date(entityData.date)).format('LT')}</p>}
                            {entityData.ticketsUrl && <p><a href={entityData.ticketsUrl} target="_blank">{entityData.ticketsUrl}</a></p>}
                        </div>
                    </div> 
                </div>
            </div>
        </div>
      )}
    />
  );
};

GigsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default GigsView;
