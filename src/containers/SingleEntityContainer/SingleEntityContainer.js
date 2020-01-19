import React from 'react';
import PropTypes from 'prop-types';
import QueryContainer from '../QueryContainer';
import MutationContainer from '../MutationContainer/MutationContainer';
import SingleEntityContent from './SingleEntityContent';

const SingleEntityContainer = ({
  baseUrl,
  entityName,
  id,
  render,
  query,
  mutation,
  renderEditLink
}) => {

  const renderMutationContainer = (mutation && Object.keys(mutation).length > 0)

  return (
    <QueryContainer
      query={query}
      queryVariables={{
        id
      }}
      entityName={entityName}
      render={queryData => (
        <div>
          {renderMutationContainer ? (
            <MutationContainer
              mutation={mutation}
              mutationVariables={{
                id
              }}
              entityName={entityName}
              baseUrl={baseUrl}
              render={({ executeMutation }) => (
                <SingleEntityContent
                  baseUrl={baseUrl}
                  data={queryData}
                  executeMutation={executeMutation}
                  render={render}
                  renderEditLink={renderEditLink}
                  renderDeleteButton
                />
              )}
            />
          ) : (
              <SingleEntityContent
                baseUrl={baseUrl}
                data={queryData}
                render={render}
                renderEditLink={renderEditLink}
              />
            )}
        </div>
      )}
    />
  );
};

SingleEntityContainer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  render: PropTypes.func,
  query: PropTypes.object.isRequired,
  mutation: PropTypes.object,
  renderEditLink: PropTypes.bool
};

SingleEntityContainer.defaultProps = {
  queryVariables: {},
  mutation: {},
  renderEditLink: false
};

export default SingleEntityContainer;
