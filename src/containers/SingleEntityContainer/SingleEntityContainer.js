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
  mutationSuccessCopy,
  isEdit
}) => {

  return (
    <article className='container'>
      <QueryContainer
        query={query}
        queryVariables={{
          id
        }}
        entityName={entityName}
        render={queryData => (
          <MutationContainer
            mutation={mutation}
            mutationVariables={{
              id
            }}
            successCopy={mutationSuccessCopy}
            baseUrl={baseUrl}
            render={({ executeMutation }) => (
              <SingleEntityContent
                baseUrl={baseUrl}
                data={queryData}
                executeMutation={executeMutation}
                render={render}
                isEdit={isEdit}
                renderDeleteButton
              />
            )}
          />
        )}
      />
    </article>
  );
};

SingleEntityContainer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  mutationSuccessCopy: PropTypes.shape({
    success: PropTypes.string,
    homeLink: PropTypes.string,
    createLink: PropTypes.string
  }),
  isEdit: PropTypes.bool
};

SingleEntityContainer.defaultProps = {
  queryVariables: {},
  mutationSuccessCopy: {},
  isEdit: false
};

export default SingleEntityContainer;
