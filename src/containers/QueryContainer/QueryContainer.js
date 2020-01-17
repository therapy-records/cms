import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';

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

  const hasData = (queryData && queryData[entityName]);

  const renderContent = (hasData && !loading)

  return (
    <article className='container'>

      {loading && (
        <LoadingSpinner
          active
          fullScreen
        />
      )}

      {error && (
        <StickyNew>
          <p>Sorry, something has gone wrong.</p>
        </StickyNew>
      )}

      {renderContent && (
        render(
          queryData[entityName]
        )
      )}

    </article>
  );
};


QueryContainer.propTypes = {
  entityName: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  queryVariables: PropTypes.object,
  render: PropTypes.func.isRequired,
};

QueryContainer.defaultProps = {
  queryVariables: {}
};

export default QueryContainer;
