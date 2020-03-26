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
    error,
    data: queryData
  } = useQuery(query, {
    variables: queryVariables
  });

  const hasData = (entityName && !isEmptyString(entityName)) ? (queryData && queryData[entityName]) : queryData;

  const renderContent = (hasData && !loading);

  return (
    <div>

      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {error && (
        <StickyError
          message='Sorry, something has gone wrong.'
          error={error}
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
