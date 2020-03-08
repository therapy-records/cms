import React from 'react';
import PropTypes from 'prop-types';
import {
  GET_PRESS,
  GET_PRESS_ARTICLE
} from '../../../queries';
import {
  EDIT_PRESS,
  DELETE_PRESS
} from '../../../mutations';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import PressForm from '../../../components/PressForm';
import FormFields from '../../../formFields';
import mapFieldsWithValues from '../../../utils/form-field-mappings';

const PressEdit = ({ match }) => {
  const { id } = match.params;

  return (
    <SingleEntityContainer
      baseUrl='/press'
      entityName='pressArticle'
      entityCollection='press'
      id={id}
      query={GET_PRESS_ARTICLE}
      isEdit
      render={entityData => (
        <PressForm
          mutation={EDIT_PRESS}
          fields={mapFieldsWithValues(
            new FormFields().press,
            entityData
          )}
          id={id}
          refetchQueries={[
            { query: GET_PRESS },
            {
              query: GET_PRESS_ARTICLE,
              variables: { id }
            }
          ]}
          isEdit
        />
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

PressEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default PressEdit;
