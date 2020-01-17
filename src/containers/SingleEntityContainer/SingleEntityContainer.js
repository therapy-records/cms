// SingleEntity is for a view/model, with either 'View'/'Edit' route
// this allows for View and Edit to both use the same header and query.

import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import QueryContainer from '../QueryContainer';
import ArticleHeader from '../../components/ArticleHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';
import FormSuccess from '../../components/FormElements/FormSuccess';

const SingleEntityContainer = ({
  baseUrl,
  entityName,
  id,
  component,
  query,
  mutation,
  renderEditLink
}) => {

  const [
    executeMutation,
    {
      loading: mutationLoading,
      error: mutationError,
      data: mutationData
    }
  ] = useMutation(mutation, {
    variables: {
      id
    }
  });
 
  const mutationSuccess = (mutationData && Object.keys(mutationData).length > 0);
  const renderPageContent = (!mutationLoading && !mutationSuccess);

  // let heading = '';
  // if (hasQueryData) {
  //   heading = queryData[entityName].heading || 
  //             queryData[entityName].title ||
  //             queryData[entityName].name;
  // }

  return (
    <QueryContainer
      query={query}
      queryVariables={{
        id
      }}
      entityName={entityName}
      render={data => (
        <div>

          {mutationLoading && (
            <LoadingSpinner
              active
              fullScreen
              isMutationLoading='true'
            />
          )}

          {mutationSuccess && (
            <FormSuccess
              baseUrl={baseUrl}
              copy={{
                success: 'Successfully mutated',
                homeLink: `Go to ${entityName}`
              }}
            />
          )}

          {mutationError && (
            <StickyNew>
              <p>Sorry, something has gone wrong with the mutation.</p>
            </StickyNew>
          )}

          {renderPageContent && (
            <div>

              <ArticleHeader
                baseUrl={baseUrl}
                article={{
                  _id: data._id
                }}
                heading='test heading'
                onDeleteArticle={() => executeMutation()}
                showDeleteButton
                showEditButton={renderEditLink}
              />

              {component({
                ...data
              })}

            </div>
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
