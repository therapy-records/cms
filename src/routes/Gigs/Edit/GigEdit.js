import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_GIG,
  GET_GIGS
} from '../../../queries';
import {
  EDIT_GIG,
  DELETE_GIG
} from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import GigForm from '../../../components/GigForm';
import FormFields from '../../../formFields';
import mapFieldsWithValues from '../../../utils/form-field-mappings';

const GigEdit = ({ match }) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/gigs'
      entityName='gig'
      entityCollection='gigs'
      id={id}
      query={GET_GIG}
      isEdit
      render={entityData => (
        <GigForm
          mutation={EDIT_GIG}
          fields={mapFieldsWithValues(
            new FormFields().gig,
            entityData
          )}
          id={id}
          refetchQueries={[
            { query: GET_GIG },
            {
              query: GET_GIGS,
              variables: { id }
            }
          ]}
          isEdit
        />
      )}
      mutation={DELETE_GIG}
      mutationSuccessCopy={{
        success: 'Successfully deleted.',
        homeLink: 'Go to Gigs'
      }}
      mutationCacheUpdate={{
        cacheQuery: GET_GIG,
        responseObjName: 'deleteGig'
      }}
    />
  );
};

GigEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default GigEdit;
