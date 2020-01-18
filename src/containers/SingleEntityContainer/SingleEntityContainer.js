import React from 'react';
import PropTypes from 'prop-types';
import QueryContainer from '../QueryContainer';
import MutationContainer from '../MutationContainer/MutationContainer';
import SingleEntityContent from './SingleEntityContent';

const SingleEntityContainer = ({
  baseUrl,
  entityName,
  id,
  component,
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
      render={data => (
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
                  data={data}
                  executeMutation={executeMutation}
                  component={component}
                  renderEditLink={renderEditLink}
                  renderDeleteButton
                />
              )}
            />
          ) : (
              <SingleEntityContent
                baseUrl={baseUrl}
                data={data}
                component={component}
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
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node
  ]).isRequired,
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
