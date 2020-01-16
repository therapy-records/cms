// SingleEntity is for a view/model, with either 'View'/'Edit' route
// this allows for View and Edit to both use the same header and query.

import React from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
  useMutation
} from '@apollo/react-hooks';
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

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData
  } = useQuery(query, {
    variables: {
      id
    }
  });

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
 
  const hasQueryData = (queryData && queryData[entityName]);

  const mutationSuccess = (mutationData && Object.keys(mutationData).length);
  const isLoading = (queryLoading || mutationLoading);
  const hasError = (queryError || mutationError);

  const renderPageContent = (hasQueryData &&
                            !isLoading &&
                            !mutationSuccess);

  let heading = '';
  if (hasQueryData) {
    heading = queryData[entityName].heading || 
              queryData[entityName].title ||
              queryData[entityName].name;
  }

  return (
    <article className='container'>

      {isLoading && (
        <LoadingSpinner
          active
          fullScreen
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

      {hasError && (
        <StickyNew>
          <p>Sorry, something has gone wrong.</p>
        </StickyNew>
      )}

      {renderPageContent && (
        <div>

          <ArticleHeader
            baseUrl={baseUrl}
            article={{
              _id: queryData[entityName]._id
            }}
            heading={heading}
            onDeleteArticle={() => executeMutation()}
            showDeleteButton
            showEditButton={renderEditLink}
          />

          {component({
            ...queryData[entityName]
          })}

        </div>
      )}

    </article>
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
  mutation: {},
  renderEditLink: false
};

export default SingleEntityContainer;
