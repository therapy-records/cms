import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyError from '../../components/StickyError';
import { isEmptyString } from '../../utils/strings';

const QueryContainer = ({
  entityName,
  query,
  queryVariables,
  render
}) => {
  const {
    loading,
    error: queryError,
    data: queryData
  } = useQuery(query, {
    variables: queryVariables
  });

  const hasData = (entityName && !isEmptyString(entityName)) ? (queryData && queryData[entityName]) : queryData;

  const renderContent = (hasData && !loading);

  const hasQueryPropError = (!loading && !queryError && entityName && !hasData);

  /* istanbul ignore next */
  if (hasQueryPropError) {
    console.warn(`The provided gql query does not return anything with entityName '${entityName}'. Is the entityName correct?`);
  }

  return (
    <div>

      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {queryError && (
        <StickyError
          message='Sorry, something has gone wrong.'
          error={queryError}
        />
      )}

      {renderContent && (
        render(
          (entityName && !isEmptyString(entityName)) ? queryData[entityName] : queryData
        )
      )}

    </div>
  );
};

QueryContainer.propTypes = {
  query: PropTypes.object.isRequired,
  queryVariables: PropTypes.object,
  render: PropTypes.func.isRequired,
  entityName: PropTypes.string
};

QueryContainer.defaultProps = {
  queryVariables: {},
  entityName: ''
};

export default QueryContainer;
